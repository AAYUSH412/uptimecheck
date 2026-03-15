import { randomUUIDv7, type ServerWebSocket } from 'bun';
import type { IncomingMessage, SignupIncomingMessage } from 'common/types';
import { prismaclient } from 'db/client';
import { logger } from './logger.js';
import { verifyMessage } from './crypto.js';
import { registerCallback, resolveCallback, pendingCallbackCount } from './callbacks.js';
import {
  startAuthTimeout,
  registerValidator,
  removeValidator,
  pickValidator,
  getAllValidators,
  validatorCount,
  PENDING_AUTH,
} from './validators.js';

// -------------------------------------------------------------------------
// Configuration (all overridable via env)
// -------------------------------------------------------------------------
const PORT = Number(process.env.HUB_PORT || 4001);
const COST_PER_VALIDATION = Number(process.env.HUB_COST_PER_VALIDATION || 100);
const CHECK_INTERVAL_MS = Number(process.env.HUB_CHECK_INTERVAL_MS || 60_000);

// -------------------------------------------------------------------------
// WebSocket handlers
// -------------------------------------------------------------------------

async function handleSignup(
  ws: ServerWebSocket<unknown>,
  data: SignupIncomingMessage,
): Promise<void> {
  const { publicKey, signedMessage, callbackId, ip, location } = data;

  logger.info(`Signup request from ${publicKey.substring(0, 10)}…`);

  const valid = await verifyMessage(
    `Sign message for ${callbackId},${publicKey}`,
    publicKey,
    signedMessage,
  );

  if (!valid) {
    logger.warn(`Signup rejected — invalid signature from ${publicKey.substring(0, 10)}…`);
    return;
  }

  // Look up or create the validator record
  let validatordb = await prismaclient.validator.findFirst({
    where: { publickey: publicKey },
  });

  if (!validatordb) {
    validatordb = await prismaclient.validator.create({
      data: {
        ip,
        publickey: publicKey,
        location: location ?? 'unknown',
      },
    });
    logger.info(`New validator created: ${validatordb.id}`);
  }

  // Register in the in-memory registry
  registerValidator(ws, validatordb.id, validatordb.publickey);

  ws.send(
    JSON.stringify({
      type: 'signup',
      data: { validatorId: validatordb.id, callbackId },
    }),
  );
}

async function handleValidateResult(data: IncomingMessage): Promise<void> {
  if (data.type !== 'validate') return;
  const resolved = resolveCallback(data.data.callbackId, data);
  if (!resolved) {
    logger.warn(`No callback for callbackId: ${data.data.callbackId} (may have expired)`);
  }
}

// -------------------------------------------------------------------------
// Bun WebSocket server
// -------------------------------------------------------------------------

Bun.serve({
  port: PORT,

  // HTTP handler — upgrade WS or serve admin /status endpoint
  fetch(req, server) {
    const url = new URL(req.url);

    if (url.pathname === '/status') {
      return Response.json({
        connectedValidators: validatorCount(),
        pendingCallbacks: pendingCallbackCount(),
        validators: getAllValidators(),
        uptime: Math.floor(process.uptime()),
      });
    }

    if (server.upgrade(req)) return;

    return new Response('Not found', { status: 404 });
  },

  websocket: {
    // Bun will automatically send ping frames to idle connections
    // and close connections that don't respond (dead socket detection)
    idleTimeout: 60,

    async open(ws: ServerWebSocket<unknown>) {
      // Start auth guard — connection must signup within AUTH_TIMEOUT_MS
      startAuthTimeout(ws);
    },

    async message(ws: ServerWebSocket<unknown>, message: string) {
      let data: IncomingMessage;

      try {
        data = JSON.parse(message) as IncomingMessage;
      } catch {
        logger.error('Failed to parse WebSocket message');
        return;
      }

      // Reject messages from connections that are not yet authenticated,
      // unless the message itself is a signup attempt
      if (PENDING_AUTH.has(ws) && data.type !== 'signup') {
        logger.warn('Rejected message from unauthenticated connection');
        return;
      }

      try {
        if (data.type === 'signup') {
          await handleSignup(ws, data.data);
        } else if (data.type === 'validate') {
          await handleValidateResult(data);
        } else {
          logger.warn(`Unknown message type: ${(data as { type: string }).type}`);
        }
      } catch (err) {
        logger.error('Error handling WebSocket message', err);
      }
    },

    close(ws: ServerWebSocket<unknown>) {
      removeValidator(ws);
    },
  },
});

logger.info(`Hub WebSocket server listening on port ${PORT}`);

// -------------------------------------------------------------------------
// Self-correcting dispatch scheduler
// -------------------------------------------------------------------------

/**
 * Dispatches each active website to exactly ONE validator (round-robin).
 * Records how long the dispatch took and compensates the next interval accordingly,
 * preventing drift on long-running hubs.
 */
async function dispatchChecks(): Promise<void> {
  const websites = await prismaclient.website.findMany({
    where: { disabled: false },
  });

  if (websites.length === 0) {
    logger.debug('No active websites to check');
    return;
  }

  if (validatorCount() === 0) {
    logger.warn('No validators connected — skipping dispatch cycle');
    return;
  }

  logger.info(`Dispatching ${websites.length} website check(s) across ${validatorCount()} validator(s)`);

  for (const website of websites) {
    const validator = pickValidator();
    if (!validator) continue; // No validators left mid-loop (disconnected)

    const callbackId = randomUUIDv7();

    validator.socket.send(
      JSON.stringify({
        type: 'validate',
        data: { url: website.url, callbackId, websiteId: website.id },
      }),
    );

    registerCallback(callbackId, async (result) => {
      if (result.type !== 'validate') return;
      const { validatorId, signedMessage, status, latency } = result.data;

      const valid = await verifyMessage(
        `Reply ${callbackId}`,
        validator.publicKey,
        signedMessage,
      );

      if (!valid) {
        logger.error(`Invalid signature on result from validator ${validatorId}`);
        return;
      }

      await prismaclient.$transaction(async (txn) => {
        await txn.websiteTick.create({
          data: {
            websiteId: website.id,
            validatorId,
            status,
            // latency is Float? in schema — accepts null after `bun run db:generate`
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            latency: latency as any,
            createdAt: new Date(),
          },
        });

        await txn.validator.update({
          where: { id: validatorId },
          data: { pendingPayout: { increment: COST_PER_VALIDATION } },
        });
      });

      logger.info(`Tick saved — ${website.url} is ${status} (${latency}ms) via validator ${validatorId}`);
    });
  }
}

function scheduleNextCheck(): void {
  const start = Date.now();

  setTimeout(async () => {
    try {
      await dispatchChecks();
    } catch (err) {
      logger.error('Dispatch cycle failed', err);
    } finally {
      // Compensate for actual elapsed time to prevent drift
      const elapsed = Date.now() - start;
      const nextDelay = Math.max(0, CHECK_INTERVAL_MS - elapsed);
      setTimeout(scheduleNextCheck, nextDelay);
    }
  }, CHECK_INTERVAL_MS);
}

// Kick off the first dispatch after one full interval
scheduleNextCheck();

import { randomUUIDv7 } from 'bun';
import type { OutgoingMessage, SignupOutgoingMessage } from 'common/types';
import { Keypair } from '@solana/web3.js';
import WebSocket from 'ws';
import { logger } from './logger.js';
import { signMessage } from './crypto.js';
import { PING_TIMEOUT_MS } from 'common/constants';

// -------------------------------------------------------------------------
// Configuration
// -------------------------------------------------------------------------
const HUB_URL = process.env.HUB_URL ?? 'ws://localhost:4001';
const PING_INTERVAL_MS = 30_000;

// -------------------------------------------------------------------------
// State
// -------------------------------------------------------------------------
let validatorId: string | null = null;
let ws: WebSocket | null = null;
let keypair: Keypair;
let reconnectAttempt = 0;
let pingTimer: ReturnType<typeof setInterval> | null = null;
let isShuttingDown = false;

// Cached public info resolved once on startup
let publicIp = '127.0.0.1';
let location = 'unknown';

const CALLBACKS: Record<string, (data: SignupOutgoingMessage) => void> = {};

// -------------------------------------------------------------------------
// Startup — detect public IP and location
// -------------------------------------------------------------------------
async function detectNodeInfo(): Promise<void> {
  try {
    const res = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = (await res.json()) as { ip?: string; country_name?: string; city?: string };
      publicIp = data.ip ?? '127.0.0.1';
      location = [data.city, data.country_name].filter(Boolean).join(', ') || 'unknown';
      logger.info(`Node info — IP: ${publicIp}, Location: ${location}`);
    }
  } catch {
    logger.warn('Could not detect public IP/location — using defaults');
  }
}

// -------------------------------------------------------------------------
// Exponential backoff reconnect
// -------------------------------------------------------------------------
function getReconnectDelay(): number {
  const base = 5_000;
  const max = 60_000;
  const delay = Math.min(base * 2 ** reconnectAttempt, max);
  reconnectAttempt += 1;
  return delay;
}

function resetReconnectDelay(): void {
  reconnectAttempt = 0;
}

// -------------------------------------------------------------------------
// Ping — real WS-level ping to detect dead hub connection
// -------------------------------------------------------------------------
function startPing(): void {
  stopPing();
  pingTimer = setInterval(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.ping();
      logger.debug('Sent WS ping to hub');
    }
  }, PING_INTERVAL_MS);
}

function stopPing(): void {
  if (pingTimer) {
    clearInterval(pingTimer);
    pingTimer = null;
  }
}

// -------------------------------------------------------------------------
// Validate handler
// -------------------------------------------------------------------------
async function validateHandler(
  socket: WebSocket,
  { url, callbackId, websiteId }: { url: string; callbackId: string; websiteId: string },
): Promise<void> {
  logger.info(`Checking ${url} (callbackId: ${callbackId})`);

  const startTime = Date.now();
  const signature = await signMessage(`Reply ${callbackId}`, keypair);

  let status: 'UP' | 'DOWN' = 'DOWN';
  let latency: number | null = null;

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(PING_TIMEOUT_MS),
    });
    latency = Date.now() - startTime;
    status = response.status >= 200 && response.status < 300 ? 'UP' : 'DOWN';
    logger.info(`${url} → ${status} (${latency}ms)`);
  } catch (err) {
    // latency stays null on timeout/network error
    logger.warn(`${url} → DOWN (error: ${err instanceof Error ? err.message : String(err)})`);
  }

  if (!validatorId) {
    logger.error('Cannot send result — validatorId not set yet');
    return;
  }

  socket.send(
    JSON.stringify({
      type: 'validate',
      data: { callbackId, status, latency, websiteId, validatorId, signedMessage: signature },
    }),
  );
}

// -------------------------------------------------------------------------
// Main connection loop
// -------------------------------------------------------------------------
async function connect(): Promise<void> {
  if (isShuttingDown) return;

  logger.info(`Connecting to hub at ${HUB_URL} (attempt ${reconnectAttempt + 1})`);
  ws = new WebSocket(HUB_URL);

  ws.onopen = async () => {
    logger.info('Connected to hub — sending signup');
    resetReconnectDelay();
    startPing();

    const callbackId = randomUUIDv7();
    CALLBACKS[callbackId] = (data: SignupOutgoingMessage) => {
      validatorId = data.validatorId;
      logger.info(`Registered as validator ID: ${validatorId}`);
    };

    const message = `Sign message for ${callbackId},${keypair.publicKey}`;
    const signedMessage = await signMessage(message, keypair);

    ws!.send(
      JSON.stringify({
        type: 'signup',
        data: {
          callbackId,
          ip: publicIp,
          publicKey: keypair.publicKey.toString(),
          signedMessage,
          location,
        },
      }),
    );
  };

  ws.onmessage = async (event) => {
    let data: OutgoingMessage;
    try {
      data = JSON.parse(event.data.toString()) as OutgoingMessage;
    } catch {
      logger.error('Failed to parse message from hub');
      return;
    }

    if (data.type === 'signup') {
      const cb = CALLBACKS[data.data.callbackId];
      if (cb) {
        cb(data.data);
        delete CALLBACKS[data.data.callbackId];
      } else {
        logger.warn(`No signup callback for callbackId: ${data.data.callbackId}`);
      }
    } else if (data.type === 'validate') {
      // Run validation asynchronously without blocking the WebSocket
      validateHandler(ws!, data.data).catch((err) => {
        logger.error(`Validation failed completely: ${err}`);
      });
    } else {
      logger.warn(`Unknown message type from hub`);
    }
  };

  ws.onerror = (err) => {
    logger.error('WebSocket error', err.message);
  };

  ws.onclose = (event) => {
    stopPing();
    ws = null;

    if (isShuttingDown) {
      logger.info('Connection closed (shutdown)');
      return;
    }

    const delay = getReconnectDelay();
    logger.warn(
      `Disconnected (code: ${event.code}) — reconnecting in ${delay / 1000}s (attempt ${reconnectAttempt})`,
    );
    setTimeout(connect, delay);
  };
}

// -------------------------------------------------------------------------
// Graceful shutdown
// -------------------------------------------------------------------------
function shutdown(signal: string): void {
  logger.info(`Received ${signal} — shutting down`);
  isShuttingDown = true;
  stopPing();

  if (ws) {
    ws.close(1000, 'Validator shutting down');
  }

  // Give the WS time to close cleanly
  setTimeout(() => process.exit(0), 1000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// -------------------------------------------------------------------------
// Entry point
// -------------------------------------------------------------------------
async function main(): Promise<void> {
  if (!process.env.PRIVATE_KEY) {
    logger.error('PRIVATE_KEY environment variable is required');
    process.exit(1);
  }

  keypair = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY)),
  );
  logger.info(`Validator public key: ${keypair.publicKey.toString()}`);

  await detectNodeInfo();
  await connect();
}

main().catch((err) => {
  logger.error('Fatal startup error', err);
  process.exit(1);
});
import type { ServerWebSocket } from 'bun';
import { createLogger } from './logger.js';

const log = createLogger('validators');

export interface ValidatorEntry {
  validatorId: string;
  socket: ServerWebSocket<unknown>;
  publicKey: string;
}

// All fully authenticated (signed-up) validators
const registry: ValidatorEntry[] = [];

// Tracks sockets that have connected but not yet sent a valid signup.
// Used to kick unauthenticated connections after a timeout.
export const PENDING_AUTH = new Set<ServerWebSocket<unknown>>();

// Round-robin cursor
let rrIndex = 0;

// -------------------------------------------------------------------------
// Auth timeout guard
// -------------------------------------------------------------------------
const AUTH_TIMEOUT_MS = Number(process.env.VALIDATOR_AUTH_TIMEOUT_MS || 15_000);

/**
 * Starts a timeout for a newly connected socket.
 * If the socket hasn't completed signup within AUTH_TIMEOUT_MS,
 * it is closed and removed from the pending set.
 */
export function startAuthTimeout(ws: ServerWebSocket<unknown>): void {
  PENDING_AUTH.add(ws);

  setTimeout(() => {
    if (PENDING_AUTH.has(ws)) {
      log.warn('Closing unauthenticated WebSocket connection (auth timeout)');
      PENDING_AUTH.delete(ws);
      try {
        ws.close(4001, 'Authentication timeout');
      } catch {
        // Already closed
      }
    }
  }, AUTH_TIMEOUT_MS);
}

// -------------------------------------------------------------------------
// Registry operations
// -------------------------------------------------------------------------

/** Registers a fully authenticated validator. */
export function registerValidator(
  ws: ServerWebSocket<unknown>,
  validatorId: string,
  publicKey: string,
): void {
  PENDING_AUTH.delete(ws);
  registry.push({ validatorId, socket: ws, publicKey });
  log.info(`Validator registered: ${validatorId} (total: ${registry.length})`);
}

/** Removes a validator when its WebSocket closes. */
export function removeValidator(ws: ServerWebSocket<unknown>): void {
  const idx = registry.findIndex((v) => v.socket === ws);
  if (idx !== -1) {
    const [removed] = registry.splice(idx, 1);
    if (removed) {
      log.info(`Validator disconnected: ${removed.validatorId} (remaining: ${registry.length})`);
    }
    // Keep rr cursor in bounds
    if (rrIndex >= registry.length) rrIndex = 0;
  }
  PENDING_AUTH.delete(ws);
}

/**
 * Picks the next available validator using round-robin.
 * Returns undefined if no validators are connected.
 */
export function pickValidator(): ValidatorEntry | undefined {
  if (registry.length === 0) return undefined;
  const entry = registry[rrIndex % registry.length];
  rrIndex = (rrIndex + 1) % registry.length;
  return entry;
}

/** Returns a snapshot of all connected validators (for /status). */
export function getAllValidators(): Omit<ValidatorEntry, 'socket'>[] {
  return registry.map(({ validatorId, publicKey }) => ({ validatorId, publicKey }));
}

/** Returns the count of connected validators. */
export function validatorCount(): number {
  return registry.length;
}

import type { IncomingMessage } from 'common/types';
import { createLogger } from './logger.js';

const log = createLogger('callbacks');

const DEFAULT_TTL_MS = Number(process.env.CALLBACK_TTL_MS || 30_000);

interface CallbackEntry {
  fn: (data: IncomingMessage) => void;
  timer: ReturnType<typeof setTimeout>;
}

// Active callbacks awaiting validator responses
const CALLBACKS = new Map<string, CallbackEntry>();

/**
 * Registers a callback for a given callbackId.
 * The callback is automatically cleaned up after `ttlMs` milliseconds
 * if it is never resolved, preventing unbounded memory growth.
 */
export function registerCallback(
  id: string,
  fn: (data: IncomingMessage) => void,
  ttlMs = DEFAULT_TTL_MS,
): void {
  const timer = setTimeout(() => {
    if (CALLBACKS.has(id)) {
      CALLBACKS.delete(id);
      log.warn(`Callback ${id} expired after ${ttlMs}ms — validator may be unresponsive`);
    }
  }, ttlMs);

  CALLBACKS.set(id, { fn, timer });
}

/**
 * Resolves the callback for the given callbackId.
 * Clears the TTL timer and invokes the registered function.
 * Returns true if a callback was found and invoked, false otherwise.
 */
export function resolveCallback(id: string, data: IncomingMessage): boolean {
  const entry = CALLBACKS.get(id);
  if (!entry) return false;

  clearTimeout(entry.timer);
  CALLBACKS.delete(id);
  entry.fn(data);
  return true;
}

/** Returns the number of in-flight (unresolved) callbacks. */
export function pendingCallbackCount(): number {
  return CALLBACKS.size;
}

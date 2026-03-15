/**
 * Shared constants used across hub, validator, and other apps.
 * Each value can be overridden by its corresponding env variable.
 */

/** Cost in Lamports (1 SOL = 1,000,000,000 Lamports) charged per validation tick. */
export const COST_PER_VALIDATION = Number(
  process.env.HUB_COST_PER_VALIDATION ?? 100,
);

/** Default interval between dispatch cycles in milliseconds. */
export const DEFAULT_CHECK_INTERVAL_MS = Number(
  process.env.HUB_CHECK_INTERVAL_MS ?? 60_000,
);

/** How long (ms) before an unresolved callback is cleaned up. */
export const CALLBACK_TTL_MS = Number(
  process.env.CALLBACK_TTL_MS ?? 30_000,
);

/** How long (ms) a newly connected WebSocket has to sign up before being closed. */
export const VALIDATOR_AUTH_TIMEOUT_MS = Number(
  process.env.VALIDATOR_AUTH_TIMEOUT_MS ?? 15_000,
);

/** Timeout (ms) for a single URL ping from the validator. */
export const PING_TIMEOUT_MS = Number(
  process.env.PING_TIMEOUT_MS ?? 10_000,
);

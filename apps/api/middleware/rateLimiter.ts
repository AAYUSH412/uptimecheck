import type { Request, Response, NextFunction } from 'express';

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

/**
 * Simple in-memory sliding-window rate limiter keyed by userId.
 * Falls back to IP address for unauthenticated requests.
 *
 * Default: 60 requests per 60-second window.
 */
const store = new Map<string, RateLimitEntry>();

const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX ?? 60);
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000);

// Prune stale entries every 5 minutes to avoid memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now - entry.windowStart > WINDOW_MS) {
      store.delete(key);
    }
  }
}, 5 * 60_000);

export function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const key = req.userId ?? req.ip ?? 'unknown';
  const now = Date.now();

  const entry = store.get(key);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    // Start fresh window
    store.set(key, { count: 1, windowStart: now });
    next();
    return;
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfterSec = Math.ceil((WINDOW_MS - (now - entry.windowStart)) / 1000);
    res.setHeader('Retry-After', String(retryAfterSec));
    res.status(429).json({
      error: 'Too many requests',
      retryAfterSeconds: retryAfterSec,
    });
    return;
  }

  entry.count += 1;
  next();
}

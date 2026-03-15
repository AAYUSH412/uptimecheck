import type { CorsOptions } from 'cors';

/**
 * CORS configuration driven by environment variables.
 * Set ALLOWED_ORIGINS as a comma-separated list, e.g.:
 *   ALLOWED_ORIGINS=http://localhost:3000,https://uptimecheck.vercel.app
 */
const rawOrigins = process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000,http://localhost:4000';

const allowedOrigins = rawOrigins
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, mobile apps, same-origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' is not allowed`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

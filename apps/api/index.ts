import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import websiteroutes from './routes/apiRoute.js';
import { requestLogger } from './middleware.js';
import { corsOptions } from './config/cors.js';
import { prismaclient } from 'db/client';

const app = express();

// -------------------------------------------------------------------------
// Core middleware
// -------------------------------------------------------------------------
app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);

// -------------------------------------------------------------------------
// Health check (no auth required)
// -------------------------------------------------------------------------
app.get('/healthz', async (_req: Request, res: Response) => {
  try {
    // Lightweight DB connectivity check
    await prismaclient.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      uptime: Math.floor(process.uptime()),
      db: 'connected',
    });
  } catch {
    res.status(503).json({
      status: 'degraded',
      uptime: Math.floor(process.uptime()),
      db: 'disconnected',
    });
  }
});

// -------------------------------------------------------------------------
// API routes
// -------------------------------------------------------------------------
app.use('/api/v1/', websiteroutes);

// -------------------------------------------------------------------------
// Global error handler  (must be last, after all routes)
// -------------------------------------------------------------------------
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  // Log the stack in development
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR] ${req.method} ${req.path}:`, err.stack ?? err.message);
  } else {
    console.error(`[ERROR] ${req.method} ${req.path}: ${err.message}`);
  }

  // CORS errors come through here too
  if (err.message.startsWith('CORS:')) {
    res.status(403).json({ error: 'Forbidden', message: err.message });
    return;
  }

  res.status(500).json({
    error: 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { message: err.message }),
  });
});

// -------------------------------------------------------------------------
// Start
// -------------------------------------------------------------------------
const PORT = Number(process.env.PORT ?? 4000);

app.listen(PORT, () => {
  console.log(`[INFO] API server running on port ${PORT}`);
});
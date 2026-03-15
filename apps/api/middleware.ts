import type { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { JWT_SECRET } from './config/jwt.js';

/**
 * Authentication middleware.
 * Verifies the JWT from the Authorization header.
 * Distinguishes between expired tokens (401 with a clear message) and
 * completely invalid tokens (401 generic) so clients can handle refresh.
 */
export function authmiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string, { algorithms: ['RS256'] });

    if (!decoded || typeof decoded !== 'object' || !decoded.sub) {
      res.status(401).json({ error: 'Unauthorized', message: 'Invalid token payload' });
      return;
    }

    req.userId = decoded.sub as string;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({ error: 'Unauthorized', message: 'Token has expired', code: 'TOKEN_EXPIRED' });
    } else if (err instanceof JsonWebTokenError) {
      res.status(401).json({ error: 'Unauthorized', message: 'Invalid token', code: 'INVALID_TOKEN' });
    } else {
      res.status(401).json({ error: 'Unauthorized', message: 'Token verification failed' });
    }
  }
}

/**
 * Request logger middleware.
 * Logs: method, path, status code, and response duration in ms.
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();
  const { method, path } = req;

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const status = res.statusCode;
    const level = status >= 500 ? 'ERROR' : status >= 400 ? 'WARN' : 'INFO';
    console.log(`[${level}] ${method} ${path} ${status} — ${duration}ms`);
  });

  next();
}
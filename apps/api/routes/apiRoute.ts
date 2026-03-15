import express from 'express';
import { getWebsite, postWebsite, deleteWebsite } from '../controller/apicontroller.js';
import { authmiddleware } from '../middleware.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Apply rate limiter after auth so it can key by userId
router.post('/website', authmiddleware, rateLimiter, postWebsite);
router.get('/website', authmiddleware, rateLimiter, getWebsite);
router.delete('/website', authmiddleware, rateLimiter, deleteWebsite);

export default router;
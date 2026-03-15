import type { Request, Response } from 'express';
import { z } from 'zod';
import { prismaclient } from 'db/client';
import { asyncHandler } from '../utils/asyncHandler.js';

// ---------------------------------------------------------------------------
// Zod Schemas
// ---------------------------------------------------------------------------
const createWebsiteSchema = z.object({
  url: z.string().url({ message: 'Please provide a valid URL (e.g. https://example.com)' }),
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const DEFAULT_TICK_LIMIT = 100;
const MAX_TICK_LIMIT = 500;

function parseTickLimit(raw: unknown): number {
  const parsed = Number(raw);
  if (isNaN(parsed) || parsed <= 0) return DEFAULT_TICK_LIMIT;
  return Math.min(parsed, MAX_TICK_LIMIT);
}

// ---------------------------------------------------------------------------
// Controllers
// ---------------------------------------------------------------------------

export const postWebsite = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const result = createWebsiteSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: 'Invalid request body',
      details: result.error.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
    });
    return;
  }

  const { url } = result.data;

  const data = await prismaclient.website.create({
    data: { userId, url },
  });

  res.status(201).json({ id: data.id });
});

export const getWebsite = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;
  const tickLimit = parseTickLimit(req.query.limit);

  // Fetch a single website by ID if ?websiteid= is provided
  if (req.query.websiteid) {
    const websiteId = req.query.websiteid as string;

    const data = await prismaclient.website.findFirst({
      where: { id: websiteId, userId, disabled: false },
      include: {
        ticks: {
          orderBy: { createdAt: 'desc' },
          take: tickLimit,
        },
      },
    });

    if (!data) {
      res.status(404).json({ error: 'Website not found' });
      return;
    }

    res.json(data);
    return;
  }

  // Fetch all websites for the user
  const websites = await prismaclient.website.findMany({
    where: { userId, disabled: false },
    include: {
      ticks: {
        orderBy: { createdAt: 'desc' },
        take: tickLimit,
      },
    },
  });

  res.json(websites);
});

export const deleteWebsite = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;
  const websiteId = req.query.websiteid as string | undefined;

  if (!websiteId) {
    res.status(400).json({ error: 'Missing required query parameter: websiteid' });
    return;
  }

  // Guard: verify the website exists and belongs to this user
  const existing = await prismaclient.website.findFirst({
    where: { id: websiteId, userId, disabled: false },
  });

  if (!existing) {
    res.status(404).json({ error: 'Website not found' });
    return;
  }

  await prismaclient.website.update({
    where: { id: websiteId },
    data: { disabled: true },
  });

  res.json({ message: 'Website deleted successfully' });
});
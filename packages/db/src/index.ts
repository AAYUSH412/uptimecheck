import { PrismaClient } from '@prisma/client';

const isDev = process.env.NODE_ENV !== 'production';

export const prismaclient = new PrismaClient({
  log: isDev ? ['warn', 'error'] : ['error'],
});
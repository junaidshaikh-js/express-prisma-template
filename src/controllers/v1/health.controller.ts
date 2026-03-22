import { Request, Response } from 'express';
import prisma from '#/lib/prisma.ts';
import logger from '#/utils/logger.ts';

export const getHealth = async (req: Request, res: Response) => {
  let dbStatus = 'OK';
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    logger.error('Database connection failed', error);
    dbStatus = 'Error';
  }

  res.status(dbStatus === 'OK' ? 200 : 503).json({
    status: dbStatus === 'OK' ? 'OK' : 'Service Unavailable',
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
};

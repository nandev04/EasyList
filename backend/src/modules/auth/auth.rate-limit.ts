import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../../lib/redis.js';

const rateLimitAuth = async (req: Request, res: Response, next: NextFunction) => {
  const key = `rate:${req.ip}`;

  try {
    const value = await redisClient.incr(key);

    if (value === 1) {
      await redisClient.expire(key, 240);
    }

    if (value > 8) {
      return res.status(429).json({ message: 'Too many requests, try again later.' });
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default rateLimitAuth;

import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../lib/redis.js';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const key = `rate:auth:${req.ip}`;

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

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const key = `rate:create:${req.ip}`;

  try {
    const value = await redisClient.incr(key);

    if (value === 1) {
      await redisClient.expire(key, 600);
    }

    if (value > 10) {
      return res.status(429).json({ message: 'Too many requests, try again later.' });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const editUser = async (req: Request, res: Response, next: NextFunction) => {
  const key = `rate:edit:${req.ip}`;

  try {
    const value = await redisClient.incr(key);

    if (value === 1) {
      await redisClient.expire(key, 600);
    }

    if (value > 30) {
      return res.status(429).json({ message: 'Too many requests, try again later.' });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const key = `rate:delete:${req.ip}`;

  try {
    const value = await redisClient.incr(key);

    if (value === 1) {
      await redisClient.expire(key, 300);
    }

    if (value > 5) {
      return res.status(429).json({ message: 'Too many requests, try again later.' });
    }

    next();
  } catch (err) {
    next(err);
  }
};

export { auth, createUser, editUser, deleteUser };

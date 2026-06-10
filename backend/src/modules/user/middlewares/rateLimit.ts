import { Request, Response, NextFunction } from 'express';
import { redis } from '../../../infra/cache/redis.js';
import formatIp from '../../../shared/utils/formatIp.js';

const default_message = 'Too many requests, try again later.';

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:getUser:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 60);
    }

    if (value > 15) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:createUser:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 600);
    }

    if (value > 10) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const editUser = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:editUser:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 600);
    }

    if (value > 30) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:deleteUser:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 600);
    }

    if (value > 8) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

export { getUser, createUser, editUser, deleteUser };

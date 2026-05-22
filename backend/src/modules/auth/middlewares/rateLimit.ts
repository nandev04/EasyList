import { Request, Response, NextFunction } from 'express';
import { redis } from '../../../infra/cache/redis.js';
import formatIp from '../../../shared/utils/formatIp.js';

const default_message = 'Too many requests, try again later.';

const general = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:auth:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 240);
    }

    if (value > 8) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:auth:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 900);
    }

    if (value > 15) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:auth:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 300);
    }

    if (value > 50) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const forgot_password = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:auth:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 240);
    }

    if (value > 8) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

export { general, login, logout, forgot_password };

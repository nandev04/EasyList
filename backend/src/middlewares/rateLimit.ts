import { Request, Response, NextFunction } from 'express';
import { redis } from '../infra/cache/redis.js';
import formatIp from '../shared/utils/formatIp.js';

const default_message = 'Too many requests, try again later.';

const auth = async (req: Request, res: Response, next: NextFunction) => {
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

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:getUser:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 180);
    }

    if (value > 1000) {
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

const getAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:getAvatar:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 180);
    }

    if (value > 1000) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:getTask:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 180);
    }

    if (value > 1000) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const createtask = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:createTask:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 300);
    }

    if (value > 35) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const editTask = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:editTask:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 300);
    }

    if (value > 75) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const ip = formatIp(req.ip);
  const key = `rate:deleteTask:${ip}`;

  try {
    const value = await redis.incr(key);

    if (value === 1) {
      await redis.expire(key, 300);
    }

    if (value > 30) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

export {
  auth,
  getUser,
  createUser,
  editUser,
  deleteUser,
  getAvatar,
  getTasks,
  createtask,
  editTask,
  deleteTask
};

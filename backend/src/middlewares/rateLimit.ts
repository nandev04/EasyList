import { Request, Response, NextFunction } from 'express';
import { redisClient } from '../lib/redis.js';

const default_message = 'Too many requests, try again later.';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const key = `rate:auth:${req.ip}`;

  try {
    const value = await redisClient.incr(key);

    if (value === 1) {
      await redisClient.expire(key, 240);
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
  const key = `rate:createUser:${req.ip}`;

  try {
    const value = await redisClient.incr(key);

    if (value === 1) {
      await redisClient.expire(key, 300);
    }

    if (value > 100) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const key = `rate:createUser:${req.ip}`;

  try {
    const value = await redisClient.incr(key);

    if (value === 1) {
      await redisClient.expire(key, 600);
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
  const key = `rate:editUser:${req.ip}`;

  try {
    const value = await redisClient.incr(key);

    if (value === 1) {
      await redisClient.expire(key, 600);
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
  const key = `rate:deleteUser:${req.ip}`;

  try {
    const value = await redisClient.incr(key);

    if (value === 1) {
      await redisClient.expire(key, 600);
    }

    if (value > 8) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  const key = `rate:getTask:${req.ip}`;

  try {
    const value = await redisClient.incr(key);

    if (value === 1) {
      await redisClient.expire(key, 300);
    }

    if (value > 100) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const createtask = async (req: Request, res: Response, next: NextFunction) => {
  const key = `rate:createTask:${req.ip}`;

  try {
    const value = await redisClient.incr(key);

    if (value === 1) {
      await redisClient.expire(key, 300);
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
  const key = `rate:editTask:${req.ip}`;

  try {
    const value = await redisClient.incr(key);

    if (value === 1) {
      await redisClient.expire(key, 300);
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
  const key = `rate:deleteTask:${req.ip}`;

  try {
    const value = await redisClient.incr(key);

    if (value === 1) {
      await redisClient.expire(key, 300);
    }

    if (value > 30) {
      return res.status(429).json({ message: default_message });
    }

    next();
  } catch (err) {
    next(err);
  }
};

export { auth, createUser, editUser, deleteUser, getTasks, createtask, editTask, deleteTask };

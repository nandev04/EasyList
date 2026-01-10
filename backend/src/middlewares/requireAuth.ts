import { NextFunction, Request, Response } from 'express';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.userId) return res.status(401).json({ message: 'Não autorizado' });
  return next();
};

export default requireAuth;

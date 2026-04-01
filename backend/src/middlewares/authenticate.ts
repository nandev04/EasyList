import { Request, Response, NextFunction } from 'express';
import applyAuthCookies from '../shared/utils/applyAuthCookies.js';
import * as Service_ResolveSession from '../modules/auth/use-cases/resolveSession/resolveSession.service.js';
import { AppError } from '../shared/utils/error.js';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Service_ResolveSession.resolveSessionToken(req.signedCookies);

    if (!result.userId) return res.status(401).json({ message: 'Não autenticado' });

    req.userId = result.userId;
    applyAuthCookies(res, result);

    return next();
  } catch (err) {
    if (err instanceof AppError) throw err;
    return res.status(401).json({ message: 'Sessão inválida' });
  }
};

export { authenticate };

import { Request, Response, NextFunction } from 'express';
import resolveSession from '../shared/utils/resolveSession.js';
import applyAuthCookies from '../shared/utils/applyAuthCookies.js';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await resolveSession(req.signedCookies);

    if (!result.userId) return res.status(401).json({ message: 'Não autenticado' });

    req.userId = result.userId;
    applyAuthCookies(res, result);

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Sessão inválida' });
  }
};

export { authenticate };

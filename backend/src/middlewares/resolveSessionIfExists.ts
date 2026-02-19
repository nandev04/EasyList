import { Request, Response, NextFunction } from 'express';
import applyAuthCookies from '../shared/utils/applyAuthCookies.js';
import resolveSession from '../shared/utils/resolveSession.js';

const resolveSessionIfExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await resolveSession(req.signedCookies);

    console.log(result);
    if (result?.userId) {
      req.userId = result.userId;
      applyAuthCookies(res, result);
      return res.sendStatus(204);
    }
    next();
  } catch {
    return next();
  }
};

export default resolveSessionIfExists;

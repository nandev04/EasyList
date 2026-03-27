import { Request, Response, NextFunction } from 'express';
import { signedCookieSchemaType } from '../../auth.schema.js';
import { AppError } from '../../../../shared/utils/error.js';
import * as Service_RefreshTkn from './refreshTkn.service.js';

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = <signedCookieSchemaType>req.validated!.signedCookies;
    if (!refreshToken) throw new AppError('Cookie refreshToken não encontrado', 400);
    await Service_RefreshTkn.refreshToken(refreshToken);

    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export { refreshToken };

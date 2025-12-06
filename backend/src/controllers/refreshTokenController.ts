import { NextFunction, Request, Response } from 'express';
import * as Service from '../services/refreshTokenService.js';
import { AppError } from '../utils/error.js';
import { RefreshTokenUserCookieType } from '../schemas/login/refreshTokenUser.schema.js';

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = <RefreshTokenUserCookieType>req.validated!.cookies;
    if (!token) throw new AppError('Cookie refreshToken não encontrado', 400);
    res.status(200).json({ token });
    const newAccessToken = await Service.refreshToken(token);
    return newAccessToken;
  } catch (err) {
    next(err);
  }
};

export { refreshToken };

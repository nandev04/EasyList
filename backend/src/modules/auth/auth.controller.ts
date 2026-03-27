import { Request, Response, NextFunction } from 'express';
import * as Service_Auth from './auth.service.js';

import { resetPasswordBodyType, VerifyCodeBodySchemaType } from './auth.schema.js';

import cookieUser from '../../shared/constants/cookieUser.js';

const verifyCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, email } = <VerifyCodeBodySchemaType>req.validated!.body;
    const tokenReset = await Service_Auth.verifyCodeService(code, email);

    return res.status(200).json(tokenReset);
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword, tokenResetPassword } = <resetPasswordBodyType>req.validated!.body;
    await Service_Auth.resetPassword(newPassword, tokenResetPassword);

    res.clearCookie('deviceId', cookieUser);
    res.clearCookie('accessToken', cookieUser);
    res.clearCookie('refreshToken', cookieUser);

    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export { verifyCode, resetPassword };

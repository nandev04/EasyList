import { Request, Response, NextFunction } from 'express';
import * as Service_Auth from './auth.service.js';

import { resetPasswordBodyType } from './auth.schema.js';

import cookieUser from '../../shared/constants/cookieUser.js';

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

export { resetPassword };

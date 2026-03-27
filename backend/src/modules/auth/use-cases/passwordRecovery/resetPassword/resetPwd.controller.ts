import { NextFunction, Request, Response } from 'express';
import { resetPasswordBodyType } from './resetPwd.schema.js';
import cookieUser from '../../../../../shared/constants/cookieUser.js';
import * as Service_ResetPwd from './resetPwd.service.js';

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword, tokenResetPassword } = <resetPasswordBodyType>req.validated!.body;
    await Service_ResetPwd.resetPassword(newPassword, tokenResetPassword);

    res.clearCookie('deviceId', cookieUser);
    res.clearCookie('accessToken', cookieUser);
    res.clearCookie('refreshToken', cookieUser);

    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export { resetPassword };

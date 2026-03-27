import { Request, Response, NextFunction } from 'express';
import * as Service_Auth from './auth.service.js';

import {
  changePasswordBodyType,
  forgotPasswordBodyType,
  RefreshTokenUserCookieType,
  resetPasswordBodyType,
  signedCookieSchemaType,
  VerifyCodeBodySchemaType,
  verifyUserQuerySchemaType
} from './schema/auth.schema.js';
import { AppError } from '../../shared/utils/error.js';
import cookieUser from '../../shared/constants/cookieUser.js';

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = <verifyUserQuerySchemaType>req.validated!.query;
    const verifiedUser = await Service_Auth.verifyTokenEmailAccount(token);

    return res.status(200).json(verifiedUser);
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = <signedCookieSchemaType>req.validated!.signedCookies;
    if (!refreshToken) throw new AppError('Cookie refreshToken não encontrado', 400);
    await Service_Auth.refreshToken(refreshToken);

    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const { newPassword, currentPassword } = <changePasswordBodyType>req.validated!.body;
    await Service_Auth.changePassword(userId, currentPassword, newPassword);

    return res.status(200).json({ message: 'Operação realizada com sucesso' });
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = <forgotPasswordBodyType>req.validated!.body;
    await Service_Auth.forgotPasswordService(email);

    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

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

export { verifyEmail, changePassword, forgotPassword, verifyCode, refreshToken, resetPassword };

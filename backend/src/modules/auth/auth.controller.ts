import { Request, Response, NextFunction } from 'express';
import * as Service_Auth from './auth.service.js';

import {
  forgotPasswordBodyType,
  RefreshTokenUserCookieType,
  resetPasswordBodyType,
  signedCookieSchemaType,
  VerifyCodeBodySchemaType,
  verifyUserQuerySchemaType
} from './auth.schema.js';
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
    res.status(200).json({ refreshToken });
    const newAccessToken = await Service_Auth.refreshToken(refreshToken);
    return newAccessToken;
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = <forgotPasswordBodyType>req.validated!.body;

    if (!email) {
      return res.status(400).json({ message: 'Email não fornecido' });
    }

    const r = await Service_Auth.forgotPasswordService(email);
    return res.status(200).json(r);
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

const verifyCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, email } = <VerifyCodeBodySchemaType>req.validated!.body;

    const tokenReset = await Service_Auth.verifyCodeService(code, email);
    return res.status(200).json(tokenReset);
  } catch (err) {
    next(err);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = <signedCookieSchemaType>req.validated!.signedCookies;

    await Service_Auth.logout(refreshToken);

    res.clearCookie('deviceId', cookieUser);
    res.clearCookie('accessToken', cookieUser);
    res.clearCookie('refreshToken', cookieUser);

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export { verifyEmail, forgotPassword, verifyCode, refreshToken, resetPassword, logout };

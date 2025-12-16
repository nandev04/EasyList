import { Request, Response, NextFunction } from 'express';
import * as Service_Auth from './auth.service.js';

import {
  forgotPasswordBodyType,
  RefreshTokenUserCookieType,
  resetPasswordBodyType,
  verifyUserQuerySchemaType
} from './auth.schema.js';
import { AppError } from '../../shared/utils/error.js';

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
    const { token } = <RefreshTokenUserCookieType>req.validated!.cookies;
    if (!token) throw new AppError('Cookie refreshToken não encontrado', 400);
    res.status(200).json({ token });
    const newAccessToken = await Service_Auth.refreshToken(token);
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

    const updatedPassword = await Service_Auth.resetPassword(newPassword, tokenResetPassword);

    return res.status(200).json(updatedPassword);
  } catch (err) {
    next(err);
  }
};

const verifyCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, email } = req.body;

    const tokenReset = await Service_Auth.verifyCodeService(code, email);
    return res.status(400).json(tokenReset);
  } catch (err) {
    next(err);
  }
};

export { verifyEmail, forgotPassword, verifyCode, refreshToken, resetPassword };

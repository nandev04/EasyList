import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as Repository_User from '../user/user.repository.js';
import * as Repository_Token from './repositories/token.repository.js';
import * as Repository_OTP from './repositories/codeOTP.repository.js';
import * as mailService from '../../shared/services/mail.service.js';
import { AppError } from '../../shared/utils/error.js';
import {
  generateAccessToken,
  generateVerifyToken,
  utilJwtVerifyAccess
} from '../../shared/utils/TokenUtils.js';
import { transformForHash } from '../../shared/utils/crypto.js';
import generateCode from '../../shared/utils/generateCode.js';
import * as Service_Device from '../device/device.service.js';
import * as Service_Token from './token.service.js';
import { VerifyTokensTypeResult, verifyTokensLoginType } from './auth.types.js';

dotenv.config();

const emailVerificationAccount = async (userId: string, email: string) => {
  if (!process.env.JWT_EMAIL_SECRET) throw new AppError('JWT_EMAIL_SECRET não definido!', 500);

  try {
    const token = generateVerifyToken(userId);
    mailService.sendVerificationMail(email, token);
  } catch (err) {
    if (err instanceof AppError) throw err;

    if (err instanceof jwt.JsonWebTokenError) throw new AppError(err.message, 401);

    throw new AppError(err instanceof Error ? err.message : 'Erro desconhecido', 500);
  }
};

export { emailVerificationAccount };

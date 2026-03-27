import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import * as mailService from '../../shared/services/mail.service.js';
import { AppError } from '../../shared/utils/error.js';
import { generateVerifyToken } from '../../shared/utils/TokenUtils.js';

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

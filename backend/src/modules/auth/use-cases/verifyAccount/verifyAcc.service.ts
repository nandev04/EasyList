import { AppError } from '../../../../shared/utils/error.js';
import { generateVerifyToken, utilJwtVerifyEmail } from '../../../../shared/utils/TokenUtils.js';
import * as Repository_User from '../../../user/user.repository.js';
import * as mailService from '../../../../shared/services/mail.service.js';
import jwt from 'jsonwebtoken';

const verifyAccountToken = async (token: string) => {
  if (!process.env.JWT_EMAIL_SECRET) throw new Error('JWT_EMAIL_SECRET não definido!');

  try {
    const payload = await utilJwtVerifyEmail(token);
    const verifiedUser = await Repository_User.verifyUser(payload.userId);
    return verifiedUser;
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(err instanceof Error ? err.message : 'Token Inválido', 401);
  }
};

const emailAccountVerification = async (userId: string, email: string) => {
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

export { verifyAccountToken, emailAccountVerification };

import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as Model from '../models/userModel.js';
import { EmailService } from './emailService.js';
import { AppError } from '../utils/error.js';
import ms from 'ms';

dotenv.config();

export class AuthService {
  static async register(userID: number, email: string) {
    if (!process.env.JWT_EMAIL_SECRET) throw new AppError('JWT_EMAIL_SECRET não definido!', 500);

    try {
      const token = jwt.sign({ userID }, process.env.JWT_EMAIL_SECRET!, { expiresIn: '1h' });
      EmailService.sendVerificationEmail(email, token);
      return token;
    } catch (err) {
      if (err instanceof AppError) throw err;

      if (err instanceof jwt.JsonWebTokenError) throw new AppError(err.message, 401);

      throw new AppError(err instanceof Error ? err.message : 'Erro desconhecido', 500);
    }
  }

  static async verifyEmail(token: string) {
    if (!process.env.JWT_EMAIL_SECRET) throw new Error('JWT_EMAIL_SECRET não definido!');

    try {
      const payload = jwt.verify(token, process.env.JWT_EMAIL_SECRET!) as { userID: number };

      const verifiedUser = await Model.verifyUser(payload.userID);
      return verifiedUser;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(err instanceof Error ? err.message : 'Token Inválido', 401);
    }
  }

  static async createTokens(userId: number) {
    if (!process.env.JWT_ACCESS_SECRET) throw new AppError('JWT_ACCESS_SECRET não definido!', 500);
    if (!process.env.JWT_REFRESH_SECRET)
      throw new AppError('JWT_REFRESH_SECRET não definido!', 500);
    try {
      const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: '7d'
      });

      // RefreshToken expira em 7 dias (transformando para ms e criando em formato Date)
      const expirationDate = new Date(
        Date.now() + ms(process.env.JWT_REFRESH_EXPIRES_IN as ms.StringValue)
      );
      await Model.upsertRefreshToken(refreshToken, userId, expirationDate);
      return { accessToken, refreshToken };
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(err instanceof Error ? err.message : 'Token Inválido', 401);
    }
  }
}

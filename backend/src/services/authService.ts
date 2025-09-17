import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as Model from '../models/userModel.js';
import { EmailService } from './emailService.js';
import { AppError } from '../utils/error.js';

dotenv.config();

export class AuthService {
  static async register(userID: number, email: string) {
    if (!process.env.JWT_EMAIL_SECRET) {
      throw new AppError('JWT_EMAIL_SECRET não definido!', 500);
    }

    try {
      const token = jwt.sign({ userID }, process.env.JWT_EMAIL_SECRET!, { expiresIn: '1h' });
      EmailService.sendVerificationEmail(email, token);
      return token;
    } catch (err) {
      if (err instanceof AppError) throw err;

      if (err instanceof JsonWebTokenError) throw new AppError(err.message, 401);

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
}

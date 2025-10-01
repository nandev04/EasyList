import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AppError } from '../utils/error';

dotenv.config();

const refreshToken = (token: string) => {
  try {
    if (!process.env.JWT_REFRESH_SECRET)
      throw new AppError('JWT_REFRESH_SECRET não definido!', 500);
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: number };
    return payload;
  } catch (error) {
    throw new AppError('Refresh token inválido ou expirado', 401);
  }
};

export { refreshToken };

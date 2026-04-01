import jwt from 'jsonwebtoken';
import { AppError } from '../../../../shared/utils/error.js';
import { generateAccessToken } from '../../../../shared/utils/TokenUtils.js';

const refreshToken = async (token: string) => {
  try {
    if (!process.env.JWT_REFRESH_SECRET)
      throw new AppError('JWT_REFRESH_SECRET não definido!', 500);
    const { userId } = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: string };

    const newAccessToken = generateAccessToken(userId);
    return newAccessToken;
  } catch (error) {
    throw new AppError('Refresh token inválido ou expirado', 401);
  }
};

export { refreshToken };

import { generateAccessToken, generateRefreshToken } from '../../shared/utils/generateToken.js';
import generateDeviceId from '../../shared/utils/generateDeviceId.js';
import { AppError } from '../../shared/utils/error.js';
import { generateRefreshExpirationDate } from '../../shared/utils/expirationDate.js';

const createTokens = (userId: number) => {
  try {
    if (!process.env.JWT_ACCESS_SECRET) throw new AppError('JWT_ACCESS_SECRET não definido!', 500);
    if (!process.env.JWT_REFRESH_SECRET)
      throw new AppError('JWT_REFRESH_SECRET não definido!', 500);

    const deviceUUID = generateDeviceId();
    const accessToken = generateAccessToken(userId);
    const { refreshTokenRaw, hashRefreshToken } = generateRefreshToken();

    const { expirationDate, expiresMs } = generateRefreshExpirationDate();

    return {
      accessToken,
      refreshTokenRaw,
      expiresMs,
      deviceUUID,
      expirationDate,
      hashRefreshToken
    };
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(err instanceof Error ? err.message : 'Token Inválido', 401);
  }
};

export { createTokens };

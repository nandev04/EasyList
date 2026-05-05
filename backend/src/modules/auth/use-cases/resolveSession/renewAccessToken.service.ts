import { transformForHash } from '../../../../shared/utils/crypto/cryptoUtils.js';
import { AppError } from '../../../../shared/utils/error.js';
import { generateAccessToken } from '../../../../shared/utils/jwt/accessToken.js';
import * as Token_Repository from '../../repositories/token.repository.js';
import { getTokenVersion } from '../../services/tokenVersion.service.js';

const renewAccessToken = async (refreshToken: string) => {
  const hashRefreshToken = transformForHash(refreshToken);
  const tokenData = await Token_Repository.verifyRefreshToken(hashRefreshToken);
  const dateNow = new Date();

  if (!tokenData) throw new AppError('Token Inválido', 401);
  if (dateNow > tokenData.expiresAt) throw new AppError('Token Expirado', 401);

  const tokenVersion = await getTokenVersion(tokenData.userId);

  const newAccessToken = generateAccessToken(tokenData.userId, tokenVersion);

  return { newAccessToken, userId: tokenData.userId, deviceId: tokenData.device.deviceUUID };
};

export default renewAccessToken;

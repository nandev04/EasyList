import { transformForHash } from '../../../../shared/utils/crypto.js';
import { AppError } from '../../../../shared/utils/error.js';
import { generateAccessToken } from '../../../../shared/utils/TokenUtils.js';
import * as Repository_Token from '../../repositories/token.repository.js';

const renewAccesToken = async (refreshToken: string) => {
  const hashRefreshToken = transformForHash(refreshToken);
  const tokenData = await Repository_Token.verifyRefreshToken(hashRefreshToken);
  const dateNow = new Date();

  if (!tokenData) throw new AppError('Token Inválido', 401);
  if (dateNow > tokenData.expiresAt) throw new AppError('Token Expirado', 401);

  const newAccessToken = generateAccessToken(tokenData.userId);

  return { newAccessToken, userId: tokenData.userId, deviceUUID: tokenData.device.deviceUUID };
};

export default renewAccesToken;

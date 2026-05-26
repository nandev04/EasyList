import { generateAccessToken } from '../../../shared/utils/jwt/accessToken.js';
import { generateToken, transformForHash } from '../../../shared/utils/crypto/cryptoUtils.js';
import { generateRefreshExpirationDate } from '../../../shared/utils/ms/msUtils.js';
import { generateUUIDv4 } from '../../../shared/utils/uuid/uuidUtils.js';

const createTokens = async (userId: string, tokenVersion: number) => {
  const deviceUUID = generateUUIDv4();
  const accessToken = generateAccessToken(userId, tokenVersion);
  const refreshTokenRaw = generateToken();
  const hashRefreshToken = transformForHash(refreshTokenRaw);

  const { expirationDate, expiresMs } = generateRefreshExpirationDate();

  return {
    accessToken,
    refreshTokenRaw,
    expiresMs,
    deviceUUID,
    expirationDate,
    hashRefreshToken
  };
};

export { createTokens };

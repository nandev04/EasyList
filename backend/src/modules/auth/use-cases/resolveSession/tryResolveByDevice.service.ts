import { generateAccessToken } from '../../../../shared/utils/jwt/accessToken.js';
import { generateToken, transformForHash } from '../../../../shared/utils/crypto/cryptoUtils.js';
import * as Repository_Device from '../../../device/device.repository.js';
import * as Repository_Token from '../../repositories/token.repository.js';
import { getTokenVersion } from '../../services/tokenVersion.service.js';
import { generateRefreshExpirationDate } from '../../../../shared/utils/ms/msUtils.js';

const tryResolveByDevice = async (deviceUUID: string) => {
  const deviceUUIDRecovered = await Repository_Device.verifyDeviceUUID(deviceUUID);
  if (deviceUUIDRecovered) {
    await Repository_Token.revokeRefreshTokenFromDeviceId(deviceUUIDRecovered.id);
    const newRefreshTokenRaw = await createRefreshTokenFromDeviceUUID(
      deviceUUIDRecovered.userId,
      deviceUUIDRecovered.id
    );
    const tokenVersion = await getTokenVersion(deviceUUIDRecovered.userId);
    const newAccessToken = generateAccessToken(deviceUUIDRecovered.userId, tokenVersion);
    return {
      userId: deviceUUIDRecovered.userId,
      newAccessToken,
      deviceId: deviceUUIDRecovered.deviceUUID,
      newRefreshTokenRaw
    };
  }
};

const createRefreshTokenFromDeviceUUID = async (userId: string, deviceId: number) => {
  const refreshTokenRaw = generateToken();
  const hashRefreshToken = transformForHash(refreshTokenRaw);
  const { expirationDate } = generateRefreshExpirationDate();
  await Repository_Token.createRefreshToken({
    hashRefreshToken,
    userId,
    deviceId,
    expiresAt: expirationDate
  });
  return refreshTokenRaw;
};

export default tryResolveByDevice;

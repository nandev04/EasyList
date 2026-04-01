import { transformForHash } from '../../../../shared/utils/crypto.js';
import { utilJwtVerifyAccess } from '../../../../shared/utils/TokenUtils.js';
import * as Repository_Token from '../../repositories/token.repository.js';

const tryResolveByAccessToken = async (
  accessToken: string,
  refreshToken?: string,
  deviceId?: string
) => {
  let refreshTokenSearched;
  const payloadAccess = await utilJwtVerifyAccess(accessToken);
  if (refreshToken && !deviceId) {
    const hashRefreshToken = transformForHash(refreshToken);
    refreshTokenSearched = await Repository_Token.verifyRefreshToken(hashRefreshToken);
  }

  return {
    ...payloadAccess,
    ...(refreshTokenSearched && {
      deviceUUID: refreshTokenSearched.device.deviceUUID
    })
  };
};

export default tryResolveByAccessToken;

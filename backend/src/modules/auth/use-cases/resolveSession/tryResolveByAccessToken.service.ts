import { transformForHash } from '../../../../shared/utils/crypto.js';
import { utilJwtVerifyAccess } from '../../../../shared/utils/TokenUtils.js';
import * as Repository_Token from '../../repositories/token.repository.js';
import { AppError } from '../../../../shared/utils/error.js';
import { getTokenVersion } from '../../services/tokenVersion.service.js';

const tryResolveByAccessToken = async (
  accessToken: string,
  refreshToken?: string,
  deviceId?: string
) => {
  let refreshTokenSearched;
  const payloadAccess = await utilJwtVerifyAccess(accessToken);
  const serverTokenVersion = await getTokenVersion(payloadAccess.userId);
  if (payloadAccess.tokenVersion !== serverTokenVersion) {
    throw new AppError('Sessão inválida, faça login novamente', 401);
  }
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

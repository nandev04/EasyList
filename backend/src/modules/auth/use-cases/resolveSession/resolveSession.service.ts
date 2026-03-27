import { AppError } from '../../../../shared/utils/error.js';
import jwt from 'jsonwebtoken';
import tryResolveByAccessToken from './tryResolveByAccessToken.service.js';
import tryResolveByDevice from './tryResolveByDevice.service.js';
import renewAccesToken from './renewAccessToken.service.js';

type verifyTokensLoginType = {
  refreshToken?: string;
  accessToken?: string;
  deviceId?: string;
};

export type verifyTokensLoginResultType = {
  userId?: string;
  newAccessToken?: string;
  deviceUUID?: string;
  newRefreshTokenRaw?: string;
};

const verifyTokensLogin = async ({
  refreshToken,
  accessToken,
  deviceId
}: verifyTokensLoginType): Promise<verifyTokensLoginResultType> => {
  if (accessToken) {
    try {
      const resultResolve = await tryResolveByAccessToken(accessToken, refreshToken, deviceId);
      return { ...resultResolve };
    } catch (err) {
      if (!(err instanceof jwt.TokenExpiredError)) {
        throw new AppError('Token de acesso inválido', 401);
      }
    }
  }

  if (!refreshToken && deviceId) {
    const returnById = await tryResolveByDevice(deviceId);
    if (returnById) return returnById;
  }

  if (!refreshToken) throw new AppError('Token de atualização ausente', 401);

  const resultRenewAccessToken = await renewAccesToken(refreshToken);
  return { ...resultRenewAccessToken };
};

export { verifyTokensLogin };

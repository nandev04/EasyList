import { Response } from 'express';
import { resolveSessionTokenResultType } from '../../modules/auth/use-cases/resolveSession/resolveSession.service.js';
import { env } from '../../config/env.js';

const applyAuthCookies = (res: Response, result: resolveSessionTokenResultType) => {
  if (result.newAccessToken) {
    res.cookie('accessToken', result.newAccessToken, {
      httpOnly: true,
      signed: true,
      secure: env.NODE_ENV === 'production'
    });
  }

  if (result.newRefreshTokenRaw) {
    res.cookie('refreshToken', result.newRefreshTokenRaw, {
      httpOnly: true,
      signed: true,
      secure: env.NODE_ENV === 'production'
    });
  }

  if (result.deviceId) {
    res.cookie('deviceId', result.deviceId, {
      httpOnly: true,
      signed: true,
      secure: env.NODE_ENV === 'production'
    });
  }
};

export default applyAuthCookies;

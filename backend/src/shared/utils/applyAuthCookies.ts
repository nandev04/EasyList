import { Response } from 'express';
import { verifyTokensLoginResultType } from '../../modules/auth/use-cases/resolveSession/resolveSession.service.js';

const applyAuthCookies = (res: Response, result: verifyTokensLoginResultType) => {
  if (result.newAccessToken) {
    res.cookie('accessToken', result.newAccessToken, {
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === 'production'
    });
  }

  if (result.newRefreshTokenRaw) {
    res.cookie('refreshToken', result.newRefreshTokenRaw, {
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === 'production'
    });
  }

  if (result.deviceUUID) {
    res.cookie('deviceId', result.deviceUUID, {
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === 'production'
    });
  }
};

export default applyAuthCookies;

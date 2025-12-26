import { Request, Response, NextFunction } from 'express';
import * as Service_Auth from '../modules/auth/auth.service.js';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken, accessToken, deviceId } = req.signedCookies;

    const resultToken = await Service_Auth.verifyTokensLogin({
      refreshToken,
      accessToken,
      deviceId
    });
    // FIX: RETORNANDO HASH DO REFRESH TOKEN AO INVES DO TOKEN RAW

    if (resultToken.deviceUUID) {
      res.cookie('refreshToken', resultToken.newRefreshTokenRaw, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        signed: true
      });

      res.cookie('accessToken', resultToken.newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        signed: true
      });

      return res.status(200).json({
        message: 'DeviceID reconhecido, novo refresh token gerado!',
        userId: resultToken.userId
      });
    }

    if (resultToken.newAccessToken) {
      res.cookie('accessToken', resultToken.newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        signed: true
      });

      return res
        .status(200)
        .json({ message: 'Novo access token gerado', userId: resultToken.userId });
    }
    return res
      .status(200)
      .json({ message: 'Login automático autorizado', userId: resultToken.userId });
  } catch (err) {
    console.error('Erro na autenticação', {
      message: err instanceof Error ? err.message : 'Erro desconhecido',
      route: req.originalUrl
    });
    return next();
  }
};

export { authenticate };

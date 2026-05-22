import { Request, Response, NextFunction } from 'express';
import cookieUser from '../../../../shared/constants/cookieUser.js';
import { signedCookieSchemaType } from './logout.schema.js';
import * as Service_Logout from './logout.service.js';

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken, deviceId } = <signedCookieSchemaType>req.validated?.signedCookies;

    if (refreshToken) {
      try {
        await Service_Logout.logout(refreshToken);
      } catch {
        // token inválido/expirado — segue limpando cookies
      }
    }

    if (deviceId) {
      try {
        await Service_Logout.revokeDevice(deviceId);
      } catch {
        // device inexistente/já revogado — segue limpando cookies
      }
    }

    res.clearCookie('deviceId', cookieUser);
    res.clearCookie('accessToken', cookieUser);
    res.clearCookie('refreshToken', cookieUser);

    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export { logout };

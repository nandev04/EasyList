import { Request, Response, NextFunction } from 'express';
import cookieUser from '../../../../shared/constants/cookieUser.js';
import { signedCookieSchemaType } from '../../auth.schema.js';
import * as Service_Logout from './logout.service.js';

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = <signedCookieSchemaType>req.validated!.signedCookies;

    await Service_Logout.logout(refreshToken);

    res.clearCookie('deviceId', cookieUser);
    res.clearCookie('accessToken', cookieUser);
    res.clearCookie('refreshToken', cookieUser);

    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export { logout };

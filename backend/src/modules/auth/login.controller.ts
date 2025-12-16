import { Request, Response, NextFunction } from 'express';
import * as Service_Login from './login.service';
import ms from 'ms';
import cookieUser from '../../shared/constants/cookieUser.js';
import { loginUserBodySchemaType } from './auth.schema.js';

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.validated!.body as loginUserBodySchemaType;

    const { refreshTokenRaw, accessToken, deviceUUID, expiresMs } = await Service_Login.loginUser(
      email,
      password
    );

    const refreshTokenMaxAge = ms(process.env.TOKEN_REFRESH_EXPIRES_IN as ms.StringValue);
    const accessTokenMaxAge = ms(process.env.JWT_ACCESS_EXPIRES_IN as ms.StringValue);

    // DeviceID
    res.cookie('deviceId', deviceUUID, {
      ...cookieUser,
      maxAge: expiresMs
    });

    // Refresh Token
    res.cookie('refreshToken', refreshTokenRaw, {
      ...cookieUser,
      maxAge: refreshTokenMaxAge
    });

    // Access Token
    res.cookie('accessToken', accessToken, {
      ...cookieUser,
      maxAge: accessTokenMaxAge
    });
    return res.status(200).json({ token: accessToken });
  } catch (error) {
    next(error);
  }
};

export { loginUser };

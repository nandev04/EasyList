import { CookieOptions } from 'express';
import { env } from '../../config/env.js';

const cookieUser: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict',
  signed: true,
  path: '/'
};

export default cookieUser;

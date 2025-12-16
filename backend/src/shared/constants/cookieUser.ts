import { CookieOptions } from 'express';

const cookieUser: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  signed: true,
  path: '/'
};

export default cookieUser;

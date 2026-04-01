import jwt from 'jsonwebtoken';
import { generateTokenRaw, transformForHash } from './crypto.js';
import ms from 'ms';

const generateVerifyToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_EMAIL_SECRET!, { expiresIn: '15m' });
  return token;
};

const generateAccessToken = (userId: string, tokenVersion: number) => {
  const token = jwt.sign({ userId, tokenVersion }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '15m'
  });
  return token;
};

const generateRefreshToken = () => {
  const refreshTokenRaw = generateTokenRaw();
  const hashRefreshToken = transformForHash(refreshTokenRaw);
  return { refreshTokenRaw, hashRefreshToken };
};

const generateRefreshExpirationDate = () => {
  const expiresMs = ms(process.env.TOKEN_REFRESH_EXPIRES_IN as ms.StringValue);

  const expirationDate = new Date(Date.now() + expiresMs);
  return { expirationDate, expiresMs };
};

const utilJwtVerifyEmail = async (token: string) => {
  return jwt.verify(token, process.env.JWT_EMAIL_SECRET!) as { userId: string };
};

const utilJwtVerifyAccess = async (accessToken: string) => {
  return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!) as {
    userId: string;
    tokenVersion: number;
  };
};

export {
  generateAccessToken,
  generateVerifyToken,
  generateRefreshToken,
  generateRefreshExpirationDate,
  utilJwtVerifyEmail,
  utilJwtVerifyAccess
};

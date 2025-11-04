import jwt from 'jsonwebtoken';
import { generateTokenRaw, transformForHash } from './crypto.js';

const createAccessToken = (userId: number) => {
  const token = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, { expiresIn: '15m' });
  return token;
};

const createRefreshToken = () => {
  const refreshTokenRaw = generateTokenRaw();
  const hashRefreshToken = transformForHash(refreshTokenRaw);
  return { refreshTokenRaw, hashRefreshToken };
};

export { createAccessToken, createRefreshToken };

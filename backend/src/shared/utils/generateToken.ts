import jwt from 'jsonwebtoken';
import { generateTokenRaw, transformForHash } from './crypto.js';

const generateVerifyToken = (userId: number) => {
  const token = jwt.sign({ userId }, process.env.JWT_EMAIL_SECRET!, { expiresIn: '15m' });
  return token;
};

const generateAccessToken = (userId: number) => {
  const token = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, { expiresIn: '15m' });
  return token;
};

const generateRefreshToken = () => {
  const refreshTokenRaw = generateTokenRaw();
  const hashRefreshToken = transformForHash(refreshTokenRaw);
  return { refreshTokenRaw, hashRefreshToken };
};

export { generateAccessToken, generateVerifyToken, generateRefreshToken };

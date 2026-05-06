import jwt from 'jsonwebtoken';
import { env } from '../../../config/env.js';

const generateAccessToken = (userId: string, tokenVersion: number) => {
  const token = jwt.sign({ userId, tokenVersion }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN
  });
  return token;
};

const utilJwtVerifyAccess = async (accessToken: string) => {
  return jwt.verify(accessToken, env.JWT_ACCESS_SECRET) as {
    userId: string;
    tokenVersion: number;
  };
};

export { generateAccessToken, utilJwtVerifyAccess };

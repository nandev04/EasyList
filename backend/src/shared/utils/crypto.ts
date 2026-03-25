import { randomBytes, createHash, randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import argon2 from 'argon2';

const generateTokenRaw = () => {
  return randomBytes(64).toString('hex');
};

const transformForHash = (stringToTransform: string) => {
  return createHash('sha256').update(stringToTransform).digest('hex');
};

const tokenUUID = () => {
  return randomUUID();
};

const createHashPassword = async (password: string) => {
  const hash = await argon2.hash(password);
  return hash;
};

const compareHash = async (password: string, hashPassword: string) =>
  await argon2.verify(hashPassword, password);

export { generateTokenRaw, transformForHash, tokenUUID, createHashPassword, compareHash };

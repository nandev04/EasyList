import { randomBytes, createHash, randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

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
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const compareHash = async (password: string, hashPassword: string) =>
  bcrypt.compare(password, hashPassword);

export { generateTokenRaw, transformForHash, tokenUUID, createHashPassword, compareHash };

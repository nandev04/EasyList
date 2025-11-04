import { randomBytes, createHash } from 'crypto';

const generateTokenRaw = () => {
  return randomBytes(64).toString('hex');
};

const transformForHash = (tokenRaw: string) => {
  return createHash('sha256').update(tokenRaw).digest('hex');
};

export { generateTokenRaw, transformForHash };

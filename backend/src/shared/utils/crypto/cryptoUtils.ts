import { randomBytes, createHash, randomUUID } from 'crypto';

const generateToken = () => randomBytes(64).toString('base64url');

const transformForHash = (stringToTransform: string) =>
  createHash('sha256').update(stringToTransform).digest('hex');

const generateUUID = () => randomUUID();

const generateCode = (length = 6) => {
  const chars = '0123456789';
  const bytes = randomBytes(length);
  let code = '';

  for (let i = 0; i < length; i++) {
    code += chars[bytes[i] % chars.length];
  }

  return code;
};

export { generateToken, transformForHash, generateUUID, generateCode };

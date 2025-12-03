import { randomBytes, createHash, randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
const generateTokenRaw = () => {
    return randomBytes(64).toString('hex');
};
const transformForHash = (tokenRaw) => {
    return createHash('sha256').update(tokenRaw).digest('hex');
};
const tokenUUID = () => {
    return randomUUID();
};
const createHashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};
export { generateTokenRaw, transformForHash, tokenUUID, createHashPassword };

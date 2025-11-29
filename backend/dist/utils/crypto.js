import { randomBytes, createHash, randomUUID } from 'crypto';
const generateTokenRaw = () => {
    return randomBytes(64).toString('hex');
};
const transformForHash = (tokenRaw) => {
    return createHash('sha256').update(tokenRaw).digest('hex');
};
const tokenUUID = () => {
    return randomUUID();
};
export { generateTokenRaw, transformForHash, tokenUUID };

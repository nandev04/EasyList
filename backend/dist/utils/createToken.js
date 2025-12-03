import jwt from 'jsonwebtoken';
import { generateTokenRaw, transformForHash } from './crypto.js';
const createVerifyToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_EMAIL_SECRET, { expiresIn: '15m' });
    return token;
};
const createAccessToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    return token;
};
const createRefreshToken = () => {
    const refreshTokenRaw = generateTokenRaw();
    const hashRefreshToken = transformForHash(refreshTokenRaw);
    return { refreshTokenRaw, hashRefreshToken };
};
export { createAccessToken, createRefreshToken, createVerifyToken };

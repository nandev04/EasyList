import jwt from 'jsonwebtoken';
import { transformForHash } from '../utils/crypto.js';
import { AppError } from '../utils/error.js';
import * as Model from '../models/userModel.js';
import { createAccessToken } from '../utils/createToken.js';
const validateJwt = async (req, res, next) => {
    const { accessToken, refreshToken } = req.signedCookies;
    if (!accessToken && !refreshToken)
        return res.status(401).json({ message: 'Acesso negado. Tokens ausentes.' });
    try {
        const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        req.userId = payload.userId;
        next();
    }
    catch (err) {
        if (!refreshToken)
            res.status(401).json({ message: 'Acesso negado. Refresh token ausente.' });
        const hashRefreshToken = transformForHash(refreshToken);
        const refreshTokenRecovered = await Model.verifyRefreshToken(hashRefreshToken);
        if (!refreshTokenRecovered)
            throw new AppError('Refresh Token não encontrado', 401);
        const dateNow = new Date();
        if (dateNow > refreshTokenRecovered.expiresAt)
            throw new AppError('Refresh Token expirado', 401);
        const newAccessToken = createAccessToken(refreshTokenRecovered.userId);
        req.userId = refreshTokenRecovered.userId;
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            signed: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000
        });
        next();
    }
};
export { validateJwt };

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AppError } from '../utils/error.js';
dotenv.config();
const refreshToken = async (token) => {
    try {
        if (!process.env.JWT_REFRESH_SECRET)
            throw new AppError('JWT_REFRESH_SECRET não definido!', 500);
        const { userId } = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '1h'
        });
        return newAccessToken;
    }
    catch (error) {
        throw new AppError('Refresh token inválido ou expirado', 401);
    }
};
export { refreshToken };

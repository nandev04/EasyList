import * as Service from '../services/refreshTokenService.js';
import { AppError } from '../utils/error.js';
const refreshToken = async (req, res, next) => {
    try {
        const { token } = req.validated.cookies;
        if (!token)
            throw new AppError('Cookie refreshToken não encontrado', 400);
        res.status(200).json({ token });
        const newAccessToken = await Service.refreshToken(token);
        return newAccessToken;
    }
    catch (err) {
        next(err);
    }
};
export { refreshToken };

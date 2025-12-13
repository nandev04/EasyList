import { AuthService } from '../services/authService.js';
const authenticate = async (req, res, next) => {
    try {
        const { refreshToken, accessToken, deviceId } = req.signedCookies;
        const resultToken = await AuthService.verifyTokens({ refreshToken, accessToken, deviceId });
        // FIX: RETORNANDO HASH DO REFRESH TOKEN AO INVES DO TOKEN RAW
        if (resultToken.tokenDevice) {
            res.cookie('refreshToken', resultToken.tokenDevice, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                signed: true
            });
            res.cookie('accessToken', resultToken.newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                signed: true
            });
            return res.status(200).json({
                message: 'Refresh token recuperado, gerado novo token de acesso',
                userId: resultToken.userId
            });
        }
        if (resultToken.newAccessToken) {
            res.cookie('accessToken', resultToken.newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                signed: true
            });
            return res
                .status(200)
                .json({ message: 'Novo access token gerado', userId: resultToken.userId });
        }
        return res
            .status(200)
            .json({ message: 'Login automático autorizado', userId: resultToken.userId });
    }
    catch (err) {
        console.error('Erro na autenticação', {
            message: err instanceof Error ? err.message : 'Erro desconhecido',
            route: req.originalUrl
        });
        return next();
    }
};
export { authenticate };

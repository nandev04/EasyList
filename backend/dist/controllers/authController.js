import { AuthService, forgotPasswordService, verifyCodeService } from '../services/authService.js';
import { AppError } from '../utils/error.js';
const verifyEmail = async (req, res) => {
    try {
        const token = req.query.token;
        if (!token) {
            return res.status(400).json({ message: 'Token não fornecido!' });
        }
        const verifiedUser = await AuthService.verifyEmail(token);
        return res.status(200).json(verifiedUser);
    }
    catch (err) {
        if (err instanceof AppError)
            return res.status(err.statusCode).json({ message: err.message });
        return res
            .status(500)
            .json({ message: err instanceof Error ? err.message : 'Erro desconhecido' });
    }
};
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email não fornecido' });
        }
        const r = await forgotPasswordService(email);
        return res.status(200).json(r);
    }
    catch (err) {
        if (err instanceof AppError)
            return res.status(err.statusCode).json({ message: err.message });
        return res
            .status(500)
            .json({ message: err instanceof Error ? err.message : 'Erro desconhecido' });
    }
};
const verifyCode = async (req, res) => {
    try {
        const { code, email } = req.body;
        const tokenReset = await verifyCodeService(code, email);
        return res.status(400).json(tokenReset);
    }
    catch (err) {
        if (err instanceof AppError)
            return res.status(err.statusCode).json({ message: err.message });
        return res
            .status(500)
            .json({ message: err instanceof Error ? err.message : 'Erro desconhecido' });
    }
};
export { verifyEmail, forgotPassword, verifyCode };

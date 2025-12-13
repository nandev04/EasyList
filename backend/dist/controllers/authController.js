import { AuthService, forgotPasswordService, verifyCodeService } from '../services/authService.js';
const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.validated.query;
        const verifiedUser = await AuthService.verifyEmail(token);
        return res.status(200).json(verifiedUser);
    }
    catch (err) {
        next(err);
    }
};
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.validated.body;
        if (!email) {
            return res.status(400).json({ message: 'Email não fornecido' });
        }
        const r = await forgotPasswordService(email);
        return res.status(200).json(r);
    }
    catch (err) {
        next(err);
    }
};
const verifyCode = async (req, res, next) => {
    try {
        const { code, email } = req.body;
        const tokenReset = await verifyCodeService(code, email);
        return res.status(400).json(tokenReset);
    }
    catch (err) {
        next(err);
    }
};
export { verifyEmail, forgotPassword, verifyCode };

import { AppError } from '../utils/error.js';
import * as resetPasswordService from '../services/resetPasswordService.js';
const resetPassword = async (req, res) => {
    try {
        const { newPassword, tokenResetPassword } = req.body;
        const updatedPassword = await resetPasswordService.resetPassword(newPassword, tokenResetPassword);
        return res.status(200).json(updatedPassword);
    }
    catch (err) {
        if (err instanceof AppError)
            return res.status(err.statusCode).json({ message: err.message });
        return res
            .status(500)
            .json({ message: err instanceof Error ? err.message : 'Erro desconhecido' });
    }
};
export { resetPassword };

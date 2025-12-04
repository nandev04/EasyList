import * as resetPasswordService from '../services/resetPasswordService.js';
const resetPassword = async (req, res, next) => {
    try {
        const { newPassword, tokenResetPassword } = req.body;
        const updatedPassword = await resetPasswordService.resetPassword(newPassword, tokenResetPassword);
        return res.status(200).json(updatedPassword);
    }
    catch (err) {
        next(err);
    }
};
export { resetPassword };

import { AppError } from '../utils/error.js';
import * as resetPasswordModel from '../models/resetPasswordModel.js';
import { createHashPassword } from '../utils/crypto.js';
const resetPassword = async (newPassword, tokenReset) => {
    const dateNow = new Date();
    const TokenResetPassword = await resetPasswordModel.validateTokenResetPassword(tokenReset);
    if (TokenResetPassword.expiresAt < dateNow)
        throw new AppError('Código expirado', 400);
    if (TokenResetPassword.used)
        throw new AppError('Código já utilizado', 400);
    const hashNewPassword = await createHashPassword(newPassword);
    const updatedPassword = await resetPasswordModel.changePassword(TokenResetPassword.userId, hashNewPassword);
    await resetPasswordModel.markTokenAsUsed(TokenResetPassword.id);
    return updatedPassword;
};
export { resetPassword };

import { AppError } from '../utils/error.js';
import prisma from '../lib/prisma.js';
const validateTokenResetPassword = async (tokenHash) => {
    const token = await prisma.passwordResetToken.findUnique({
        where: { token: tokenHash },
        select: { token: true, used: true, expiresAt: true, user: true, userId: true, id: true }
    });
    if (!token)
        throw new AppError('Usuário não encontrado', 404);
    return token;
};
const changePassword = async (id, newPassword) => {
    const updatedUser = await prisma.user.update({
        where: { id },
        data: { password: newPassword },
        select: { id: true, name: true }
    });
    return updatedUser;
};
const markTokenAsUsed = async (tokenId) => {
    await prisma.passwordResetToken.update({
        where: { id: tokenId },
        data: { used: true }
    });
};
export { validateTokenResetPassword, changePassword, markTokenAsUsed };

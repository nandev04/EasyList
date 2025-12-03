import { AppError } from '../utils/error.js';
import prisma from '../lib/prisma.js';
const validateTokenResetPassword = async (tokenHash) => {
    try {
        const token = await prisma.passwordResetToken.findUnique({
            where: { token: tokenHash },
            select: { token: true, used: true, expiresAt: true, user: true, userId: true, id: true }
        });
        if (!token)
            throw new AppError('Usuário não encontrado', 404);
        return token;
    }
    catch (error) {
        if (error instanceof AppError)
            throw error;
        throw new AppError(error instanceof Error ? error.message : 'Erro desconhecido', 500);
    }
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

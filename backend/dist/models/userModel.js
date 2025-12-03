import { AppError } from '../utils/error.js';
import prisma from '../lib/prisma.js';
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError } from '@prisma/client/runtime/library.js';
const getUser = async (id) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: +id
            },
            select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
        });
        if (!user)
            throw new AppError('Usuário não encontrado', 404);
        return user;
    }
    catch (error) {
        if (error instanceof AppError)
            throw error;
        throw new AppError(error instanceof Error ? error.message : 'Erro desconhecido', 500);
    }
};
const createUser = async ({ username, hashPassword, email }) => {
    try {
        const createdUser = await prisma.user.create({
            data: {
                name: username,
                password: hashPassword,
                email: email
            }
        });
        return { id: createdUser.id, username: createdUser.name, email: createdUser.email };
    }
    catch (error) {
        if (error instanceof PrismaClientKnownRequestError)
            throw new AppError(error.message, 400);
        if (error instanceof PrismaClientUnknownRequestError ||
            error instanceof PrismaClientRustPanicError ||
            error instanceof PrismaClientInitializationError ||
            error instanceof Error)
            throw new AppError(error.message, 500);
        throw new AppError('Erro desconhecido', 500);
    }
};
const editUser = async ({ id, data }) => {
    try {
        const editedUser = await prisma.user.update({
            where: { id },
            data: { ...data },
            select: { id: true, name: true, updatedAt: true }
        });
        return editedUser;
    }
    catch (error) {
        if (error instanceof PrismaClientKnownRequestError)
            throw new AppError(error.message, 400);
        if (error instanceof PrismaClientUnknownRequestError ||
            error instanceof PrismaClientRustPanicError ||
            error instanceof PrismaClientInitializationError ||
            error instanceof Error)
            throw new AppError(error.message, 500);
        throw new AppError('Erro desconhecido', 500);
    }
};
const deleteUser = async (id) => {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id },
            select: { id: true }
        });
        return deletedUser;
    }
    catch (error) {
        if (error instanceof PrismaClientKnownRequestError)
            throw new AppError(error.message, 400);
        if (error instanceof PrismaClientUnknownRequestError ||
            error instanceof PrismaClientRustPanicError ||
            error instanceof PrismaClientInitializationError ||
            error instanceof Error)
            throw new AppError(error.message, 500);
        throw new AppError('Erro desconhecido', 500);
    }
};
const verifyUser = async (id) => {
    try {
        const verifiedUser = await prisma.user.update({
            where: { id },
            data: { verified: true },
            select: { updatedAt: true, verified: true }
        });
        return verifiedUser;
    }
    catch (error) {
        if (error instanceof PrismaClientKnownRequestError)
            throw new AppError(error.message, 400);
        if (error instanceof PrismaClientUnknownRequestError ||
            error instanceof PrismaClientRustPanicError ||
            error instanceof PrismaClientInitializationError ||
            error instanceof Error)
            throw new AppError(error.message, 500);
        throw new AppError('Erro desconhecido', 500);
    }
};
const findByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email, verified: true },
            select: { password: true, id: true }
        });
        if (!user)
            throw new AppError('Usuário não encontrado', 404);
        return user;
    }
    catch (error) {
        if (error instanceof AppError)
            throw error;
        throw new AppError(error instanceof Error ? error.message : 'Erro desconhecido model', 500);
    }
};
const createRefreshToken = async (refreshToken, userId, deviceId, expiresAt) => {
    try {
        const createRefreshToken = await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId,
                deviceId,
                expiresAt
            }
        });
        return createRefreshToken;
    }
    catch (error) {
        if (error instanceof PrismaClientKnownRequestError)
            throw new AppError(error.message, 400);
        if (error instanceof PrismaClientUnknownRequestError ||
            error instanceof PrismaClientRustPanicError ||
            error instanceof PrismaClientInitializationError ||
            error instanceof Error)
            throw new AppError(error.message, 500);
        throw new AppError('Erro desconhecido', 500);
    }
};
const verifyRefreshToken = async (refreshToken) => {
    try {
        const token = await prisma.refreshToken.findUnique({
            where: {
                token: refreshToken
            },
            select: { token: true, expiresAt: true, userId: true }
        });
        if (!token)
            throw new AppError('Token não encontrado', 404);
        return token;
    }
    catch (error) {
        if (error instanceof AppError)
            throw error;
        throw new AppError(error instanceof Error ? error.message : 'Erro desconhecido', 500);
    }
};
const verifyDeviceId = async (deviceId) => {
    try {
        const tokenDevice = await prisma.refreshToken.findUnique({
            where: {
                deviceId: deviceId
            },
            select: { token: true, userId: true }
        });
        if (!tokenDevice)
            throw new AppError('Token não encontrado', 404);
        return tokenDevice;
    }
    catch (error) {
        if (error instanceof AppError)
            throw error;
        throw new AppError(error instanceof Error ? error.message : 'Erro desconhecido', 500);
    }
};
const createCodeOTP = async (tokenHash, expiresAt, userId) => {
    try {
        const createTokenForgot = await prisma.passwordResetOTP.create({
            data: {
                tokenHash,
                expiresAt,
                userId
            }
        });
        return createTokenForgot;
    }
    catch (error) {
        if (error instanceof PrismaClientKnownRequestError)
            throw new AppError(error.message, 400);
        if (error instanceof PrismaClientUnknownRequestError ||
            error instanceof PrismaClientRustPanicError ||
            error instanceof PrismaClientInitializationError ||
            error instanceof Error)
            throw new AppError(error.message, 500);
        throw new AppError('Erro desconhecido', 500);
    }
};
const findCodeOTP = async (hashCode, userId) => {
    try {
        const code = await prisma.passwordResetOTP.findFirst({
            where: {
                userId,
                tokenHash: hashCode
            },
            select: { userId: true, used: true, expiresAt: true, id: true }
        });
        if (!code)
            throw new AppError('Código não encontrado', 404);
        return code;
    }
    catch (error) {
        if (error instanceof AppError)
            throw error;
        throw new AppError(error instanceof Error ? error.message : 'Erro desconhecido', 500);
    }
};
const markCodeAsUsed = async (id) => {
    try {
        const markCode = await prisma.passwordResetOTP.update({
            where: { id: id },
            data: {
                used: true
            }
        });
        return markCode;
    }
    catch (error) {
        if (error instanceof PrismaClientKnownRequestError)
            throw new AppError(error.message, 400);
        if (error instanceof PrismaClientUnknownRequestError ||
            error instanceof PrismaClientRustPanicError ||
            error instanceof PrismaClientInitializationError ||
            error instanceof Error)
            throw new AppError(error.message, 500);
        throw new AppError('Erro desconhecido', 500);
    }
};
const createTokenUUID = async (id, token) => {
    try {
        const createToken = await prisma.passwordResetToken.create({
            data: {
                userId: id,
                token,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000)
            }
        });
        return createToken;
    }
    catch (error) {
        if (error instanceof PrismaClientKnownRequestError)
            throw new AppError(error.message, 400);
        if (error instanceof PrismaClientUnknownRequestError ||
            error instanceof PrismaClientRustPanicError ||
            error instanceof PrismaClientInitializationError ||
            error instanceof Error)
            throw new AppError(error.message, 500);
        throw new AppError('Erro desconhecido', 500);
    }
};
export { getUser, createUser, editUser, deleteUser, verifyUser, findByEmail, createRefreshToken, verifyRefreshToken, verifyDeviceId, createCodeOTP, findCodeOTP, markCodeAsUsed, createTokenUUID };

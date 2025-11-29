import { AppError } from '../utils/error.js';
import prisma from '../lib/prisma.js';
import { CreateUserType } from '../types/users.js';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError
} from '@prisma/client/runtime/library.js';

const getUser = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +id
      },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
    });
    if (!user) throw new AppError('Usuário não encontrado', 404);
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(error instanceof Error ? error.message : 'Erro desconhecido', 500);
  }
};

const createUser = async ({ username, hashPassword, email }: CreateUserType) => {
  try {
    const createdUser = await prisma.user.create({
      data: {
        name: username,
        password: hashPassword,
        email: email
      }
    });
    return { id: createdUser.id, username: createdUser.name, email: createdUser.email };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) throw new AppError(error.message, 400);
    if (
      error instanceof PrismaClientUnknownRequestError ||
      error instanceof PrismaClientRustPanicError ||
      error instanceof PrismaClientInitializationError ||
      error instanceof Error
    )
      throw new AppError(error.message, 500);
    throw new AppError('Erro desconhecido', 500);
  }
};

const editUser = async ({ id, data }: { id: number; data: object }) => {
  try {
    const editedUser = await prisma.user.update({
      where: { id },
      data: { ...data },
      select: { id: true, name: true, updatedAt: true }
    });
    return editedUser;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) throw new AppError(error.message, 400);
    if (
      error instanceof PrismaClientUnknownRequestError ||
      error instanceof PrismaClientRustPanicError ||
      error instanceof PrismaClientInitializationError ||
      error instanceof Error
    )
      throw new AppError(error.message, 500);
    throw new AppError('Erro desconhecido', 500);
  }
};

const deleteUser = async (id: number) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
      select: { id: true }
    });

    return deletedUser;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) throw new AppError(error.message, 400);
    if (
      error instanceof PrismaClientUnknownRequestError ||
      error instanceof PrismaClientRustPanicError ||
      error instanceof PrismaClientInitializationError ||
      error instanceof Error
    )
      throw new AppError(error.message, 500);
    throw new AppError('Erro desconhecido', 500);
  }
};

const verifyUser = async (id: number) => {
  try {
    const verifiedUser = await prisma.user.update({
      where: { id },
      data: { verified: true },
      select: { updatedAt: true, verified: true }
    });

    return verifiedUser;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) throw new AppError(error.message, 400);
    if (
      error instanceof PrismaClientUnknownRequestError ||
      error instanceof PrismaClientRustPanicError ||
      error instanceof PrismaClientInitializationError ||
      error instanceof Error
    )
      throw new AppError(error.message, 500);
    throw new AppError('Erro desconhecido', 500);
  }
};

const findByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email, verified: true },
      select: { password: true, id: true }
    });
    if (!user) throw new AppError('Usuário não encontrado', 404);
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(error instanceof Error ? error.message : 'Erro desconhecido model', 500);
  }
};

const createRefreshToken = async (
  refreshToken: string,
  userId: number,
  deviceId: string,
  expiresAt: Date
) => {
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
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) throw new AppError(error.message, 400);
    if (
      error instanceof PrismaClientUnknownRequestError ||
      error instanceof PrismaClientRustPanicError ||
      error instanceof PrismaClientInitializationError ||
      error instanceof Error
    )
      throw new AppError(error.message, 500);
    throw new AppError('Erro desconhecido', 500);
  }
};

const verifyRefreshToken = async (refreshToken: string) => {
  try {
    const token = await prisma.refreshToken.findUnique({
      where: {
        token: refreshToken
      },
      select: { token: true, expiresAt: true, userId: true }
    });
    if (!token) throw new AppError('Token não encontrado', 404);
    return token;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(error instanceof Error ? error.message : 'Erro desconhecido', 500);
  }
};

const verifyDeviceId = async (deviceId: string) => {
  try {
    const tokenDevice = await prisma.refreshToken.findUnique({
      where: {
        deviceId: deviceId
      },
      select: { token: true, userId: true }
    });
    if (!tokenDevice) throw new AppError('Token não encontrado', 404);
    return tokenDevice;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(error instanceof Error ? error.message : 'Erro desconhecido', 500);
  }
};

const createCodeForgot = async (tokenHash: string, expiresAt: Date, userId: number) => {
  try {
    const createTokenForgot = await prisma.passwordResetCode.create({
      data: {
        tokenHash,
        expiresAt,
        userId
      }
    });
    return createTokenForgot;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) throw new AppError(error.message, 400);
    if (
      error instanceof PrismaClientUnknownRequestError ||
      error instanceof PrismaClientRustPanicError ||
      error instanceof PrismaClientInitializationError ||
      error instanceof Error
    )
      throw new AppError(error.message, 500);
    throw new AppError('Erro desconhecido', 500);
  }
};

const findCodeForgot = async (hashCode: string, userId: number) => {
  try {
    const code = await prisma.passwordResetCode.findFirst({
      where: {
        userId,
        tokenHash: hashCode
      },
      select: { userId: true, expiresAt: true }
    });
    if (!code) throw new AppError('Código não encontrado', 404);
    return code;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(error instanceof Error ? error.message : 'Erro desconhecido', 500);
  }
};

export {
  getUser,
  createUser,
  editUser,
  deleteUser,
  verifyUser,
  findByEmail,
  createRefreshToken,
  verifyRefreshToken,
  verifyDeviceId,
  createCodeForgot,
  findCodeForgot
};

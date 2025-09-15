import { AppError } from '../utils/error.js';
import prisma from '../lib/prisma.js';
import { CreateUserType } from '../types/users.js';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library.js';

const getUser = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
    if (!user) throw new AppError('Usuário não encontrado', 404);
    return user;
  } catch (error) {
    throw new AppError(error instanceof Error ? error.message : 'Erro desconhecido', 500);
  }
};

const createUser = async ({ username, hashPassword, email }: CreateUserType) => {
  try {
    const createdUser = await prisma.user.create({
      data: {
        name: username,
        password: hashPassword,
        email: email,
      },
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

const editUser = async ({ id, data }: { id: number; data: {} }) => {
  try {
    const editedUser = await prisma.user.update({
      where: { id },
      data: { ...data },
      select: { id: true, name: true, updatedAt: true },
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
      select: { id: true },
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
      select: { updatedAt: true, verified: true },
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

export { getUser, createUser, editUser, deleteUser, verifyUser };

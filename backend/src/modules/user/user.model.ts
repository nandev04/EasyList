import { AppError } from '../../shared/utils/error.js';
import prisma from '../../lib/prisma.js';
import { CreateUserType } from './user.type.js';
import { updateUserSchemaBodyType } from './user.schema.js';

const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id
    },
    select: { id: true, username: true, email: true, createdAt: true, updatedAt: true }
  });
  if (!user) throw new AppError('Usuário não encontrado', 404);
  return user;
};

const createUser = async ({ username, hashPassword, email }: CreateUserType) => {
  const createdUser = await prisma.user.create({
    data: {
      username: username,
      password: hashPassword,
      email: email
    }
  });
  return { id: createdUser.id, username: createdUser.username, email: createdUser.email };
};

const updateUser = async ({ id, data }: { id: number; data: updateUserSchemaBodyType }) => {
  const editedUser = await prisma.user.update({
    where: { id },
    data: { ...data },
    select: { id: true, username: true, updatedAt: true }
  });
  return editedUser;
};

const changePassword = async (id: number, newPassword: string) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { password: newPassword },
    select: { id: true, username: true }
  });
  return updatedUser;
};

const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id }
  });
};

const insertAvatar = async (id: number, avatarUrl: string) => {
  return await prisma.user.update({
    where: { id },
    data: { avatarUrl }
  });
};

const verifyUser = async (id: number) => {
  const verifiedUser = await prisma.user.update({
    where: { id },
    data: { verified: true },
    select: { updatedAt: true, verified: true }
  });

  return verifiedUser;
};

const findByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email, verified: true },
    select: { password: true, id: true }
  });
  if (!user) throw new AppError('Usuário não encontrado', 404);
  return user;
};

export {
  getUser,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
  verifyUser,
  findByEmail,
  insertAvatar
};

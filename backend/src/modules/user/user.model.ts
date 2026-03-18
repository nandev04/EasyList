import { AppError } from '../../shared/utils/error.js';
import prisma from '../../lib/prisma.js';
import { CreateUserType } from './user.type.js';
import { updateUserSchemaBodyType } from './user.schema.js';

const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id
    },
    select: {
      firstname: true,
      lastname: true,
      username: true,
      email: true,
      avatarKey: true,
      createdAt: true,
      updatedAt: true,
      verified: true
    }
  });
  return user;
};

const createUser = async (data: CreateUserType) => {
  const createdUser = await prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.hashPassword
    },
    select: {
      id: true,
      username: true,
      firstname: true,
      lastname: true,
      avatarKey: true,
      email: true
    }
  });
  return createdUser;
};

const updateUser = async ({ id, data }: { id: number; data: updateUserSchemaBodyType }) => {
  const editedUser = await prisma.user.update({
    where: { id },
    data: { ...data }
  });
};

const createEmailCodeOTP = async (data: {
  tokenHash: string;
  expiresAt: Date;
  new_email: string;
  userId: number;
}) => {
  await prisma.updateEmailOTP.create({ data });
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

const updateAvatar = async (id: number, avatarKey: string) => {
  return await prisma.user.update({
    where: { id },
    data: { avatarKey }
  });
};

const verifyOTPCodeUpdateEmail = async (userId: number, tokenHash: string) => {
  return await prisma.updateEmailOTP.findFirst({
    where: { userId, tokenHash },
    select: {
      id: true,
      expiresAt: true,
      used: true,
      new_email: true,
      user: { select: { email: true } }
    }
  });
};

const markCodeAsUsed = async (id: number) => {
  return await prisma.updateEmailOTP.update({
    where: { id },
    data: { used: true }
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
  createEmailCodeOTP,
  changePassword,
  deleteUser,
  verifyOTPCodeUpdateEmail,
  markCodeAsUsed,
  verifyUser,
  findByEmail,
  updateAvatar
};

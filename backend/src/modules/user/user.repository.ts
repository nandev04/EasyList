import { AppError } from '../../shared/utils/error.js';
import prisma from '../../infra/database/prismaClient.js';
import { CreateUserType } from './user.type.js';
import { updateUserSchemaBodyType } from './user.schema.js';
import { Prisma } from '@prisma/client/default.js';

const getUser = async <T extends Prisma.UserSelect>(id: string, select: T) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id
    },
    select
  });
  return user;
};

const createUser = async <T extends Prisma.UserSelect>(data: CreateUserType, select: T) => {
  const { hashPassword, ...restData } = data;
  const createdUser = await prisma.user.create({
    data: {
      ...restData,
      password: data.hashPassword
    },
    select
  });
  return createdUser;
};

const updateUser = async ({ userId, data }: { userId: string; data: updateUserSchemaBodyType }) => {
  await prisma.user.update({
    where: { id: userId },
    data: { ...data }
  });
};

const createEmailCodeOTP = async (data: {
  tokenHash: string;
  expiresAt: Date;
  new_email: string;
  userId: string;
}) => {
  await prisma.updateEmailOTP.create({ data });
};

const changePassword = async (userId: string, newPassword: string) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { password: newPassword },
    select: { id: true, username: true }
  });
  return updatedUser;
};

const deleteUser = async (userId: string) => {
  return await prisma.user.delete({
    where: { id: userId }
  });
};

const updateAvatar = async (userId: string, avatarKey: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { avatarKey }
  });
};

const verifyOTPCodeUpdateEmail = async (userId: string, tokenHash: string) => {
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

const verifyUser = async (id: string) => {
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
    select: { password: true, id: true, tokenVersion: true }
  });
  return user;
};

const incrementTokenVersion = async (id: string) => {
  await prisma.user.update({
    where: { id },
    data: {
      tokenVersion: { increment: 1 }
    }
  });
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
  updateAvatar,
  findByEmail,
  incrementTokenVersion
};

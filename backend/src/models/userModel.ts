import { AppError } from '../utils/error.js';
import prisma from '../lib/prisma.js';
import { CreateUserType } from '../typesAndInterfaces/users.js';
import { updateUserSchemaBodyType } from '../schemas/users/updateUser.schema.js';

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

const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id }
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

const createRefreshToken = async (
  refreshToken: string,
  userId: number,
  deviceId: string,
  expiresAt: Date
) => {
  const createRefreshToken = await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId,
      deviceId,
      expiresAt
    }
  });
  return createRefreshToken;
};

const verifyRefreshToken = async (refreshToken: string) => {
  return await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken
    },
    select: { token: true, expiresAt: true, userId: true }
  });
};

const verifyDeviceId = async (deviceId: string) => {
  const tokenDevice = await prisma.refreshToken.findUnique({
    where: {
      deviceId: deviceId
    },
    select: { token: true, userId: true }
  });
  if (!tokenDevice) throw new AppError('Token não encontrado', 404);
  return tokenDevice;
};

const createCodeOTP = async (tokenHash: string, expiresAt: Date, userId: number) => {
  const createTokenForgot = await prisma.passwordResetOTP.create({
    data: {
      tokenHash,
      expiresAt,
      userId
    }
  });
  return createTokenForgot;
};

const findCodeOTP = async (hashCode: string, userId: number) => {
  const code = await prisma.passwordResetOTP.findFirst({
    where: {
      userId,
      tokenHash: hashCode
    },
    select: { userId: true, used: true, expiresAt: true, id: true }
  });
  if (!code) throw new AppError('Código não encontrado', 404);
  return code;
};

const markCodeAsUsed = async (id: number) => {
  const markCode = await prisma.passwordResetOTP.update({
    where: { id: id },
    data: {
      used: true
    }
  });
  return markCode;
};

const createTokenUUID = async (id: number, token: string) => {
  const createToken = await prisma.passwordResetToken.create({
    data: {
      userId: id,
      token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000)
    }
  });
  return createToken;
};

export {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
  findByEmail,
  createRefreshToken,
  verifyRefreshToken,
  verifyDeviceId,
  createCodeOTP,
  findCodeOTP,
  markCodeAsUsed,
  createTokenUUID
};

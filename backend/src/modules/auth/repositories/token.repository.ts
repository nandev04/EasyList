import prisma from '../../../lib/prisma.js';

export type createTokensType = {
  hashRefreshToken: string;
  userId: string;
  deviceId: number;
  expiresAt: Date;
};

const createRefreshToken = async ({
  hashRefreshToken,
  userId,
  deviceId,
  expiresAt
}: createTokensType) => {
  const createRefreshToken = await prisma.refreshToken.create({
    data: {
      token: hashRefreshToken,
      userId,
      deviceId,
      expiresAt
    }
  });
  return createRefreshToken;
};

const createTokenUUID = async (userId: string, token: string) => {
  const createToken = await prisma.passwordResetToken.create({
    data: {
      userId,
      token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000)
    }
  });
  return createToken;
};

const verifyRefreshToken = async (hashRefreshToken: string) => {
  return await prisma.refreshToken.findUnique({
    where: {
      token: hashRefreshToken
    },
    select: { id: true, token: true, expiresAt: true, userId: true, device: true }
  });
};

const validateTokenResetPassword = async (tokenHash: string) => {
  const token = await prisma.passwordResetToken.findUnique({
    where: { token: tokenHash },
    select: { used: true, expiresAt: true, userId: true, id: true }
  });
  return token;
};

const markTokenAsUsed = async (tokenId: number) => {
  await prisma.passwordResetToken.update({
    where: { id: tokenId },
    data: { used: true }
  });
};

const revokeRefreshToken = async (id: number): Promise<void> => {
  await prisma.refreshToken.update({
    where: { id },
    data: { revokedAt: new Date() }
  });
};

const revokeRefreshTokenFromDeviceId = async (deviceId: number): Promise<void> => {
  await prisma.refreshToken.updateMany({
    where: { deviceId },
    data: { revokedAt: new Date() }
  });
};

export {
  createRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeRefreshTokenFromDeviceId,
  createTokenUUID,
  validateTokenResetPassword,
  markTokenAsUsed
};

import { createTokensType } from './token.type.js';
import prisma from '../../lib/prisma.js';

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

const verifyRefreshToken = async (refreshToken: string) => {
  return await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken
    },
    select: { token: true, expiresAt: true, userId: true }
  });
};

const revokeRefreshToken = async (deviceId: number) => {
  return await prisma.refreshToken.updateMany({
    where: { deviceId },
    data: { revokedAt: new Date() }
  });
};

export { createRefreshToken, verifyRefreshToken, revokeRefreshToken, createTokenUUID };

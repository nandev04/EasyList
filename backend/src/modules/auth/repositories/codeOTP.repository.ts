import { AppError } from '../../../shared/utils/error.js';
import prisma from '../../../infra/database/prismaClient.js';

const createCodeOTP = async (tokenHash: string, expiresAt: Date, userId: string) => {
  const createTokenForgot = await prisma.passwordResetOTP.create({
    data: {
      tokenHash,
      expiresAt,
      userId
    }
  });
  return createTokenForgot;
};

const findCodeOTP = async (hashCode: string, userId: string) => {
  const code = await prisma.passwordResetOTP.findFirst({
    where: {
      userId,
      tokenHash: hashCode
    },
    select: { userId: true, used: true, expiresAt: true, id: true }
  });
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

export { createCodeOTP, findCodeOTP, markCodeAsUsed };

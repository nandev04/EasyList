import { AppError } from '../../shared/utils/error.js';
import prisma from '../../lib/prisma.js';

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

export { createCodeOTP, findCodeOTP, markCodeAsUsed };

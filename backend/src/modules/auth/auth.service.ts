import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as Model_User from '../user/user.model.js';
import * as Model_Token from './token.model.js';
import * as Model_OTP from './codeOTP.model.js';
import * as mailService from '../../shared/services/mail.service.js';
import { AppError } from '../../shared/utils/error.js';
import { generateAccessToken, generateVerifyToken } from '../../shared/utils/generateToken.js';
import { transformForHash, tokenUUID, createHashPassword } from '../../shared/utils/crypto.js';
import generateCode from '../../shared/utils/generateCode.js';
import * as Service_Device from '../device/device.service.js';
import * as Service_Token from './token.service.js';
import { VerifyTokensTypeResult, verifyTokensType } from './auth.types.js';

dotenv.config();

const emailVerificationAccount = (userId: number, email: string) => {
  if (!process.env.JWT_EMAIL_SECRET) throw new AppError('JWT_EMAIL_SECRET não definido!', 500);

  try {
    const token = generateVerifyToken(userId);
    mailService.sendVerificationMail(email, token);
    return token;
  } catch (err) {
    if (err instanceof AppError) throw err;

    if (err instanceof jwt.JsonWebTokenError) throw new AppError(err.message, 401);

    throw new AppError(err instanceof Error ? err.message : 'Erro desconhecido', 500);
  }
};

const verifyTokenEmailAccount = async (token: string) => {
  if (!process.env.JWT_EMAIL_SECRET) throw new Error('JWT_EMAIL_SECRET não definido!');

  try {
    const payload = jwt.verify(token, process.env.JWT_EMAIL_SECRET!) as { userId: number };

    const verifiedUser = await Model_User.verifyUser(payload.userId);
    return verifiedUser;
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(err instanceof Error ? err.message : 'Token Inválido', 401);
  }
};

const verifyTokens = async ({
  refreshToken,
  accessToken,
  deviceId
}: verifyTokensType): Promise<VerifyTokensTypeResult> => {
  if (accessToken) {
    try {
      const { userId } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!) as {
        userId: number;
      };
      return { userId };
    } catch (err) {
      if (!(err instanceof jwt.TokenExpiredError))
        throw new AppError('Token de acesso inválido', 401);
    }
  }

  if (!refreshToken && deviceId) {
    const { deviceUUID, userId, id } = await Service_Device.verifyTokenDevice(deviceId);
    await Model_Token.revokeRefreshToken(id);
    const newRefreshTokenRaw = await Service_Token.createTokenFromDeviceUUID(userId, id);
    const newAccessToken = generateAccessToken(userId);
    return {
      userId,
      newAccessToken,
      deviceUUID,
      newRefreshTokenRaw
    };
  }

  if (!refreshToken) throw new AppError('Token de atualização ausente', 401);

  const hashRefreshToken = transformForHash(refreshToken);
  const tokenData = await Model_Token.verifyRefreshToken(hashRefreshToken);
  const dateNow = new Date();

  if (!tokenData) throw new AppError('Token Inválido', 401);
  if (dateNow > tokenData.expiresAt) throw new AppError('Token Expirado', 401);

  const newAccessToken = generateAccessToken(tokenData.userId);
  return { newAccessToken, userId: tokenData.userId };
};

const refreshToken = async (token: string) => {
  try {
    if (!process.env.JWT_REFRESH_SECRET)
      throw new AppError('JWT_REFRESH_SECRET não definido!', 500);
    const { userId } = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: number };

    const newAccessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: '1h'
    });
    return newAccessToken;
  } catch (error) {
    throw new AppError('Refresh token inválido ou expirado', 401);
  }
};

// Forgot Password
const forgotPasswordService = async (email: string) => {
  const userId = await Model_User.findByEmail(email);
  if (!userId) throw new AppError('Usuário não encontrado', 404);

  const code = generateCode();
  const hashCodeForgot = transformForHash(code);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await Model_OTP.createCodeOTP(hashCodeForgot, expiresAt, userId.id);

  // Disparar email com token e email
  mailService.sendForgotPasswordEmail(email, code);
};

const resetPassword = async (newPassword: string, tokenReset: string) => {
  const dateNow = new Date();
  const TokenResetPassword = await Model_Token.validateTokenResetPassword(tokenReset);

  if (TokenResetPassword.expiresAt < dateNow) throw new AppError('Código expirado', 400);
  if (TokenResetPassword.used) throw new AppError('Código já utilizado', 400);

  const hashNewPassword = await createHashPassword(newPassword);

  const updatedPassword = await Model_User.changePassword(
    TokenResetPassword.userId,
    hashNewPassword
  );

  await Model_Token.markTokenAsUsed(TokenResetPassword.id);

  return updatedPassword;
};

const verifyCodeService = async (code: string, email: string) => {
  const { id } = await Model_User.findByEmail(email);

  const dateNow = new Date();

  const codeHash = transformForHash(code);

  const codeFetched = await Model_OTP.findCodeOTP(codeHash, id);

  if (codeFetched.expiresAt < dateNow) throw new AppError('Código expirado', 400);
  if (codeFetched.used) throw new AppError('Código já utilizado', 400);

  await Model_OTP.markCodeAsUsed(codeFetched.id);

  const tokenResetPassword = tokenUUID();

  await Model_Token.createTokenUUID(codeFetched.userId, tokenResetPassword);

  return tokenResetPassword;
};

export {
  emailVerificationAccount,
  verifyTokenEmailAccount,
  verifyTokens,
  refreshToken,
  forgotPasswordService,
  resetPassword,
  verifyCodeService
};

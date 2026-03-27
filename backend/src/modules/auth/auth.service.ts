import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as Repository_User from '../user/user.repository.js';
import * as Repository_Token from './repositories/token.repository.js';
import * as Repository_OTP from './repositories/codeOTP.repository.js';
import * as mailService from '../../shared/services/mail.service.js';
import { AppError } from '../../shared/utils/error.js';
import {
  generateAccessToken,
  generateVerifyToken,
  utilJwtVerifyAccess
} from '../../shared/utils/TokenUtils.js';
import {
  transformForHash,
  tokenUUID,
  createHashPassword,
  compareHash
} from '../../shared/utils/crypto.js';
import generateCode from '../../shared/utils/generateCode.js';
import * as Service_Device from '../device/device.service.js';
import * as Service_Token from './token.service.js';
import { VerifyTokensTypeResult, verifyTokensLoginType } from './auth.types.js';
import { userAuthSelect, userPublicSelect } from '../user/user.select.js';

dotenv.config();

const emailVerificationAccount = async (userId: string, email: string): Promise<void> => {
  if (!process.env.JWT_EMAIL_SECRET) throw new AppError('JWT_EMAIL_SECRET não definido!', 500);

  try {
    const token = generateVerifyToken(userId);
    mailService.sendVerificationMail(email, token);
  } catch (err) {
    if (err instanceof AppError) throw err;

    if (err instanceof jwt.JsonWebTokenError) throw new AppError(err.message, 401);

    throw new AppError(err instanceof Error ? err.message : 'Erro desconhecido', 500);
  }
};

const verifyTokensLogin = async ({
  refreshToken,
  accessToken,
  deviceId
}: verifyTokensLoginType): Promise<VerifyTokensTypeResult> => {
  if (accessToken) {
    try {
      let refreshTokenSearched;
      const payloadAccess = await utilJwtVerifyAccess(accessToken);
      if (refreshToken && !deviceId) {
        const hashRefreshToken = transformForHash(refreshToken);
        refreshTokenSearched = await Repository_Token.verifyRefreshToken(hashRefreshToken);
      }
      return { ...payloadAccess, deviceUUID: refreshTokenSearched?.device.deviceUUID };
    } catch (err) {
      if (!(err instanceof jwt.TokenExpiredError))
        throw new AppError('Token de acesso inválido', 401);
    }
  }

  if (!refreshToken && deviceId) {
    const { deviceUUID, userId, id } = await Service_Device.verifyTokenDevice(deviceId);
    await Repository_Token.revokeRefreshTokenFromDeviceId(id);
    const newRefreshTokenRaw = await Service_Token.createRefreshTokenFromDeviceUUID(userId, id);
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
  const tokenData = await Repository_Token.verifyRefreshToken(hashRefreshToken);
  const dateNow = new Date();

  if (!tokenData) throw new AppError('Token Inválido', 401);
  if (dateNow > tokenData.expiresAt) throw new AppError('Token Expirado', 401);

  const newAccessToken = generateAccessToken(tokenData.userId);
  return { newAccessToken, userId: tokenData.userId, deviceUUID: tokenData.device.deviceUUID };
};

const resetPassword = async (newPassword: string, tokenReset: string): Promise<void> => {
  const dateNow = new Date();
  const TokenResetPassword = await Repository_Token.validateTokenResetPassword(tokenReset);

  if (!TokenResetPassword) throw new AppError('Token não encontrado', 404);
  if (TokenResetPassword.expiresAt < dateNow) throw new AppError('Token expirado', 400);
  if (TokenResetPassword.used) throw new AppError('Token já utilizado', 400);

  const hashNewPassword = await createHashPassword(newPassword);

  await Repository_User.changePassword(TokenResetPassword.userId, hashNewPassword);

  await Repository_Token.markTokenAsUsed(TokenResetPassword.id);
};

const verifyCodeService = async (code: string, email: string) => {
  const { id } = await Repository_User.findByEmail(email);

  const dateNow = new Date();

  const codeHash = transformForHash(code);

  const codeFetched = await Repository_OTP.findCodeOTP(codeHash, id);

  if (codeFetched.expiresAt < dateNow) throw new AppError('Código expirado', 400);
  if (codeFetched.used) throw new AppError('Código já utilizado', 400);

  await Repository_OTP.markCodeAsUsed(codeFetched.id);

  const tokenResetPassword = tokenUUID();

  await Repository_Token.createTokenUUID(codeFetched.userId, tokenResetPassword);

  return tokenResetPassword;
};

export { emailVerificationAccount, verifyTokensLogin, resetPassword, verifyCodeService };

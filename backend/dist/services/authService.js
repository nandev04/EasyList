import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as Model from '../models/userModel.js';
import { EmailService } from './emailService.js';
import { AppError } from '../utils/error.js';
import ms from 'ms';
import { createAccessToken, createRefreshToken, createVerifyToken } from '../utils/createToken.js';
import { v4 as uuidv4 } from 'uuid';
import { transformForHash, tokenUUID } from '../utils/crypto.js';
import generateCode from '../utils/generateCode.js';
dotenv.config();
export class AuthService {
    static async register(userId, email) {
        if (!process.env.JWT_EMAIL_SECRET)
            throw new AppError('JWT_EMAIL_SECRET não definido!', 500);
        try {
            const token = createVerifyToken(userId);
            EmailService.sendVerificationEmail(email, token);
            return token;
        }
        catch (err) {
            if (err instanceof AppError)
                throw err;
            if (err instanceof jwt.JsonWebTokenError)
                throw new AppError(err.message, 401);
            throw new AppError(err instanceof Error ? err.message : 'Erro desconhecido', 500);
        }
    }
    static async verifyEmail(token) {
        if (!process.env.JWT_EMAIL_SECRET)
            throw new Error('JWT_EMAIL_SECRET não definido!');
        try {
            const payload = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
            const verifiedUser = await Model.verifyUser(payload.userId);
            return verifiedUser;
        }
        catch (err) {
            if (err instanceof AppError)
                throw err;
            throw new AppError(err instanceof Error ? err.message : 'Token Inválido', 401);
        }
    }
    static async createTokens(userId) {
        if (!process.env.JWT_ACCESS_SECRET)
            throw new AppError('JWT_ACCESS_SECRET não definido!', 500);
        if (!process.env.JWT_REFRESH_SECRET)
            throw new AppError('JWT_REFRESH_SECRET não definido!', 500);
        const deviceId = uuidv4();
        try {
            const accessToken = createAccessToken(userId);
            const { refreshTokenRaw, hashRefreshToken } = createRefreshToken();
            const expiresMs = ms(process.env.TOKEN_REFRESH_EXPIRES_IN);
            const expirationDate = new Date(Date.now() + expiresMs);
            await Model.createRefreshToken(hashRefreshToken, userId, deviceId, expirationDate);
            return { accessToken, refreshTokenRaw, expiresMs, deviceId };
        }
        catch (err) {
            if (err instanceof AppError)
                throw err;
            throw new AppError(err instanceof Error ? err.message : 'Token Inválido', 401);
        }
    }
    static async getRefreshTokenFromDevice(deviceId) {
        const tokenDevice = await Model.verifyDeviceId(deviceId);
        return tokenDevice ?? null;
    }
    static async verifyTokens({ refreshToken, accessToken, deviceId }) {
        if (accessToken) {
            try {
                const { userId } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
                return { userId };
            }
            catch (err) {
                if (!(err instanceof jwt.TokenExpiredError))
                    throw new AppError('Token de acesso inválido', 401);
            }
        }
        if (!refreshToken && deviceId) {
            const { userId, token } = await this.getRefreshTokenFromDevice(deviceId);
            const newAccessToken = createAccessToken(userId);
            return {
                userId,
                newAccessToken,
                tokenDevice: token
            };
        }
        if (!refreshToken)
            throw new AppError('Token de atualização ausente', 401);
        const hashRefreshToken = transformForHash(refreshToken);
        const { userId, expiresAt } = await Model.verifyRefreshToken(hashRefreshToken);
        const dateNow = new Date();
        if (!userId)
            throw new AppError('Token Inválido', 401);
        if (dateNow > expiresAt)
            throw new AppError('Token Expirado', 401);
        const newAccessToken = createAccessToken(userId);
        return { newAccessToken, userId };
    }
}
// Forgot Password
const forgotPasswordService = async (email) => {
    const userId = await Model.findByEmail(email);
    if (!userId)
        throw new AppError('Usuário não encontrado', 404);
    const code = generateCode();
    const hashCodeForgot = transformForHash(code);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await Model.createCodeOTP(hashCodeForgot, expiresAt, userId.id);
    // Disparar email com token e email
    EmailService.sendForgotPasswordEmail(email, code);
};
const verifyCodeService = async (code, email) => {
    const { id } = await Model.findByEmail(email);
    const dateNow = new Date();
    const codeHash = transformForHash(code);
    const codeFetched = await Model.findCodeOTP(codeHash, id);
    if (codeFetched.expiresAt < dateNow)
        throw new AppError('Código expirado', 400);
    if (codeFetched.used)
        throw new AppError('Código já utilizado', 400);
    await Model.markCodeAsUsed(codeFetched.id);
    const tokenResetPassword = tokenUUID();
    await Model.createTokenUUID(codeFetched.userId, tokenResetPassword);
    return tokenResetPassword;
};
export { forgotPasswordService, verifyCodeService };

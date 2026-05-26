import { AppError } from '../../../../shared/utils/error.js';
import * as Repository_User from '../../../user/user.repository.js';
import * as Repository_Auth from '../../repositories/token.repository.js';
import * as mailService from '../../../../shared/services/mail.service.js';
import { generateToken, transformForHash } from '../../../../shared/utils/crypto/cryptoUtils.js';

const generateAccountToken = async (userId: string, email: string) => {
  const token = generateToken();
  const hashToken = transformForHash(token);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  const tokenCreated = await Repository_Auth.createAccountVerifyToken(userId, hashToken, expiresAt);
  await Repository_Auth.revokeAccountVerifyTokenOld(userId, tokenCreated.id);
  mailService.accountVerification(email, token);
};

const verifyAccountToken = async (token: string) => {
  const tokenHash = transformForHash(token);
  const tokenSearched = await Repository_Auth.getAccountVerifyToken(tokenHash);
  const dateNow = new Date();

  if (!tokenSearched) throw new AppError('Token inválido', 401, 'INVALID_TOKEN');
  if (tokenSearched.revokedAt || dateNow > tokenSearched.expiresAt || tokenSearched.used) {
    throw new AppError('Token inválido ou expirado', 410, 'INVALID_TOKEN');
  }

  await Repository_Auth.markAccountVerifyTokenAsUsed(tokenSearched.id);
  await Repository_User.verifyUser(tokenSearched.userId);
};

const resendAccountToken = async (email: string) => {
  const user = await Repository_User.findByEmailNotVerified(email);
  if (!user) return null;
  await generateAccountToken(user.id, email);
};

export { verifyAccountToken, generateAccountToken, resendAccountToken };

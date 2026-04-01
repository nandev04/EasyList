import { transformForHash } from '../../../shared/utils/crypto.js';
import { AppError } from '../../../shared/utils/error.js';
import * as User_Repository from '../../user/user.repository.js';
import * as Token_Repository from '../repositories/token.repository.js';
import { deleteTokenVersion } from './tokenVersion.service.js';

async function invalidAllTokens(userId: string) {
  await User_Repository.incrementTokenVersion(userId);
  await Token_Repository.revokeRefreshTokenFromUser(userId);
  await deleteTokenVersion(userId);
}

async function revokeRefreshToken(refreshToken: string) {
  const hashRefreshToken = transformForHash(refreshToken);
  const tokenData = await Token_Repository.verifyRefreshToken(hashRefreshToken);
  if (!tokenData) throw new AppError('Token Inválido', 401);

  await Token_Repository.revokeRefreshToken(tokenData.id);
}

export { invalidAllTokens, revokeRefreshToken };

import { transformForHash } from '../../../../shared/utils/crypto.js';
import { AppError } from '../../../../shared/utils/error.js';
import * as Repository_Token from '../../repositories/token.repository.js';

const logout = async (refreshToken: string) => {
  const hashRefreshToken = transformForHash(refreshToken);
  const tokenData = await Repository_Token.verifyRefreshToken(hashRefreshToken);
  if (!tokenData) throw new AppError('Token Inválido', 401);

  await Repository_Token.revokeRefreshToken(tokenData.id);
};

export { logout };

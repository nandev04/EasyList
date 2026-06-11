import { createHashPassword } from '../../../../../shared/utils/argon2/argon2Utils.js';
import { AppError } from '../../../../../shared/utils/error.js';
import { User_Repository } from '../../../index.js';

import * as Repository_Token from '../../../repositories/token.repository.js';

const resetPassword = async (newPassword: string, tokenReset: string) => {
  const dateNow = new Date();
  const TokenResetPassword = await Repository_Token.validateTokenResetPassword(tokenReset);

  if (!TokenResetPassword) throw new AppError('Token inválido', 400, 'TOKEN_NOT_FOUND');
  if (TokenResetPassword.expiresAt < dateNow)
    throw new AppError('Token expirado', 410, 'EXPIRED_TOKEN');
  if (TokenResetPassword.used) throw new AppError('Token já utilizado', 410, 'USED_TOKEN');

  const hashNewPassword = await createHashPassword(newPassword);

  await User_Repository.changePassword(TokenResetPassword.userId, hashNewPassword);

  await Repository_Token.markTokenAsUsed(TokenResetPassword.id);
};

export { resetPassword };

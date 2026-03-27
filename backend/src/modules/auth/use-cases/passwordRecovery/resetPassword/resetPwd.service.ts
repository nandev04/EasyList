import { createHashPassword } from '../../../../../shared/utils/crypto.js';
import { AppError } from '../../../../../shared/utils/error.js';
import * as Repository_User from '../../../../user/user.repository.js';
import * as Repository_Token from '../../../repositories/token.repository.js';

const resetPassword = async (newPassword: string, tokenReset: string) => {
  const dateNow = new Date();
  const TokenResetPassword = await Repository_Token.validateTokenResetPassword(tokenReset);

  if (!TokenResetPassword) throw new AppError('Token não encontrado', 404);
  if (TokenResetPassword.expiresAt < dateNow) throw new AppError('Token expirado', 400);
  if (TokenResetPassword.used) throw new AppError('Token já utilizado', 400);

  const hashNewPassword = await createHashPassword(newPassword);

  await Repository_User.changePassword(TokenResetPassword.userId, hashNewPassword);

  await Repository_Token.markTokenAsUsed(TokenResetPassword.id);
};

export { resetPassword };

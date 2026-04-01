import { tokenUUID, transformForHash } from '../../../../../shared/utils/crypto.js';
import { AppError } from '../../../../../shared/utils/error.js';
import * as User_Repository from '../../../../user/user.repository.js';
import * as Otp_Repository from '../../../repositories/codeOTP.repository.js';
import * as Token_Repository from '../../../repositories/token.repository.js';

const verifyCodeService = async (code: string, email: string) => {
  const user = await User_Repository.findByEmail(email);
  if (!user) throw new AppError('Usuário correspondente ao email não encontrado', 404);

  const dateNow = new Date();

  const codeHash = transformForHash(code);

  const codeFetched = await Otp_Repository.findCodeOTP(codeHash, user.id);

  if (codeFetched.expiresAt < dateNow) throw new AppError('Código expirado', 401);
  if (codeFetched.used) throw new AppError('Código já utilizado', 401);

  await Otp_Repository.markCodeAsUsed(codeFetched.id);

  const tokenResetPassword = tokenUUID();

  await Token_Repository.createTokenUUID(codeFetched.userId, tokenResetPassword);

  return tokenResetPassword;
};

export { verifyCodeService };

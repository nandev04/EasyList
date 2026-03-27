import { tokenUUID, transformForHash } from '../../../../../shared/utils/crypto.js';
import { AppError } from '../../../../../shared/utils/error.js';
import * as Repository_User from '../../../../user/user.repository.js';
import * as Repository_Otp from '../../../repositories/codeOTP.repository.js';
import * as Repository_Token from '../../../repositories/token.repository.js';

const verifyCodeService = async (code: string, email: string) => {
  const { id } = await Repository_User.findByEmail(email);

  const dateNow = new Date();

  const codeHash = transformForHash(code);

  const codeFetched = await Repository_Otp.findCodeOTP(codeHash, id);

  if (codeFetched.expiresAt < dateNow) throw new AppError('Código expirado', 400);
  if (codeFetched.used) throw new AppError('Código já utilizado', 400);

  await Repository_Otp.markCodeAsUsed(codeFetched.id);

  const tokenResetPassword = tokenUUID();

  await Repository_Token.createTokenUUID(codeFetched.userId, tokenResetPassword);

  return tokenResetPassword;
};

export { verifyCodeService };

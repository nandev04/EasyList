import { transformForHash } from '../../../../../shared/utils/crypto/cryptoUtils.js';
import { generateUUIDv4 } from '../../../../../shared/utils/uuid/uuidUtils.js';
import { AppError } from '../../../../../shared/utils/error.js';
import * as Otp_Repository from '../../../repositories/codeOTP.repository.js';
import * as Token_Repository from '../../../repositories/token.repository.js';
import { User_Repository } from '../../../index.js';

const verifyCodeService = async (code: string, email: string) => {
  const user = await User_Repository.findByEmail(email);

  const dateNow = new Date();

  const codeHash = transformForHash(code);

  const codeFetched = user ? await Otp_Repository.findCodeOTP(codeHash, user.id) : null;

  if (!codeFetched) throw new AppError('Código inválido', 400, 'INVALID_CODE');
  if (codeFetched.expiresAt < dateNow) throw new AppError('Código expirado', 410, 'EXPIRED_CODE');
  if (codeFetched.used) throw new AppError('Código já utilizado', 410, 'USED_CODE');

  await Otp_Repository.markCodeAsUsed(codeFetched.id);

  const tokenResetPassword = generateUUIDv4();

  await Token_Repository.createTokenUUID(codeFetched.userId, tokenResetPassword);

  return tokenResetPassword;
};

export { verifyCodeService };

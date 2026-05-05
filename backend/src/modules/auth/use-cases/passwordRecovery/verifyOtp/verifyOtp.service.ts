import { transformForHash } from '../../../../../shared/utils/crypto/cryptoUtils.js';
import { generateUUIDv4 } from '../../../../../shared/utils/uuid/uuidUtils.js';
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

  if (!codeFetched) throw new AppError('Código não encontrado', 404);
  if (codeFetched.expiresAt < dateNow) throw new AppError('Código expirado', 401);
  if (codeFetched.used) throw new AppError('Código já utilizado', 401);

  await Otp_Repository.markCodeAsUsed(codeFetched.id);

  const tokenResetPassword = generateUUIDv4();

  await Token_Repository.createTokenUUID(codeFetched.userId, tokenResetPassword);

  return tokenResetPassword;
};

export { verifyCodeService };

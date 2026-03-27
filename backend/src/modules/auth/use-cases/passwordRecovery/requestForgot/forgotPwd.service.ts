import { transformForHash } from '../../../../../shared/utils/crypto.js';
import { AppError } from '../../../../../shared/utils/error.js';
import generateCode from '../../../../../shared/utils/generateCode.js';
import * as Repository_User from '../../../../user/user.repository.js';
import * as Repository_OTP from '../../../repositories/codeOTP.repository.js';
import * as MailService from '../../../../../shared/services/mail.service.js';

const forgotPasswordService = async (email: string) => {
  const user = await Repository_User.findByEmail(email);
  if (!user) throw new AppError('Usuário não encontrado', 404);

  const code = generateCode();
  const hashCodeForgot = transformForHash(code);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await Repository_OTP.createCodeOTP(hashCodeForgot, expiresAt, user.id);

  MailService.sendForgotPasswordEmail(email, code);
};

export { forgotPasswordService };

import { User_Repository } from '../../../index.js';
import { transformForHash } from '../../../../../shared/utils/crypto/cryptoUtils.js';
import { generateCode } from '../../../../../shared/utils/crypto/cryptoUtils.js';
import * as Repository_OTP from '../../../repositories/codeOTP.repository.js';
import * as MailService from '../../../../../shared/services/mail.service.js';

const forgotPasswordService = async (email: string) => {
  const user = await User_Repository.findByEmail(email);

  if (user) {
    const code = generateCode();
    const hashCodeForgot = transformForHash(code);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await Repository_OTP.createCodeOTP(hashCodeForgot, expiresAt, user.id);

    MailService.otpForgotPassword(email, code);
  }

  return { success: true };
};

export { forgotPasswordService };

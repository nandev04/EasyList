import * as cryptoUtils from '../../../../../shared/utils/crypto.js';
import generateCode from '../../../../../shared/utils/generateCode.js';
import { createUserId } from '../../../../../shared/utils/uuid.js';
import * as User_Repository from '../../../../user/user.repository.js';
import * as Otp_Repository from '../../../repositories/codeOTP.repository.js';
import * as ServiceMail from '../../../../../shared/services/mail.service.js';
import { forgotPasswordService } from './forgotPwd.service.js';

vi.mock('../../../../../shared/utils/generateCode.js');

describe('forgotPasswordService', () => {
  const email = 'teste@gmail.com';

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Should return an object containing "success: true" if the user is not found', async () => {
    vi.spyOn(User_Repository, 'findByEmail').mockResolvedValue(null);
    vi.spyOn(ServiceMail, 'otpForgotPassword').mockResolvedValue(undefined as never);
    vi.spyOn(Otp_Repository, 'createCodeOTP').mockResolvedValue(undefined as never);

    expect(ServiceMail.otpForgotPassword).toBeCalledTimes(0);
    expect(Otp_Repository.createCodeOTP).toBeCalledTimes(0);
    expect(await forgotPasswordService(email)).toEqual({ success: true });
  });

  test('Should call createCodeOTP function of repository and call the email service for email trigger', async () => {
    const user: Awaited<ReturnType<typeof User_Repository.findByEmail>> = {
      id: createUserId(),
      password: 'test-password',
      tokenVersion: 30
    };
    const code = generateCode();
    const hashCodeForgot = 'hash-Code-forgot';
    const fixedNow = 1704067200000;
    const expiresAt = new Date(fixedNow + 15 * 60 * 1000);

    vi.mocked(generateCode).mockReturnValue(code);
    vi.spyOn(cryptoUtils, 'transformForHash').mockReturnValue(hashCodeForgot);
    vi.spyOn(User_Repository, 'findByEmail').mockResolvedValue(user);
    vi.spyOn(Otp_Repository, 'createCodeOTP').mockResolvedValue(undefined as never);
    vi.spyOn(ServiceMail, 'otpForgotPassword').mockResolvedValue(undefined);
    vi.spyOn(Date, 'now').mockReturnValue(fixedNow);

    await forgotPasswordService(email);

    expect(Otp_Repository.createCodeOTP).toBeCalledTimes(1);
    expect(Otp_Repository.createCodeOTP).toBeCalledWith(hashCodeForgot, expiresAt, user.id);
    expect(ServiceMail.otpForgotPassword).toBeCalledTimes(1);
    expect(ServiceMail.otpForgotPassword).toBeCalledWith(email, code);
  });
});

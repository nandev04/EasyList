vi.mock('../../shared/utils/TokenUtils');
vi.mock('../user/user.repository');
vi.mock('../device/device.service');
vi.mock('../auth/token.repository');
vi.mock('./token.service');
vi.mock('./codeOTP.repository');
vi.mock('../../shared/utils/crypto', async () => {
  const actual = await vi.importActual<typeof import('../../shared/utils/crypto')>(
    '../../shared/utils/crypto'
  );

  return {
    ...actual,
    transformForHash: vi.fn(),
    tokenUUID: vi.fn()
  };
});
vi.mock('../../shared/utils/generateCode');
vi.mock('../../shared/services/mail.service');

import jwt from 'jsonwebtoken';
import {
  generateAccessToken,
  generateVerifyToken,
  utilJwtVerifyAccess,
  utilJwtVerifyEmail
} from '../../shared/utils/TokenUtils';
import {
  emailVerificationAccount,
  forgotPasswordService,
  resetPassword,
  verifyCodeService,
  verifyTokenEmailAccount,
  verifyTokensLogin
} from './auth.service';
import * as Repository_User from '../user/user.repository';
import * as Repository_Token from './token.repository';
import * as Service_Device from '../device/device.service';
import { AppError } from '../../shared/utils/error';
import * as Service_Token from './token.service';
import * as hashUtils from '../../shared/utils/crypto';
import generateCode from '../../shared/utils/generateCode';
import * as Repository_OTP from './codeOTP.repository';
import * as mailService from '../../shared/services/mail.service';

describe('resetPassword', () => {
  const resultValidateTokenResetPassword = {
    id: 31321,
    userId: 4325,
    expiresAt: new Date(Date.now() + 100000),
    used: false
  };

  const resetPasswordInput = {
    email: 'email@test',
    password: 'password!test'
  };

  test('Should throw an AppError when the TokenResetPassword is not found with the message: Token não encontrado; and statusCode: 404', async () => {
    const err = new AppError('Token não encontrado', 404);

    await expect(
      resetPassword(resetPasswordInput.email, resetPasswordInput.password)
    ).rejects.toMatchObject({
      message: err.message,
      statusCode: err.statusCode
    });
  });

  test('Should throw an AppError when the TokenResetPassword has been expired with the message: Token expirado; and statusCode: 400', async () => {
    const err = new AppError('Token expirado', 400);

    vi.mocked(Repository_Token.validateTokenResetPassword).mockResolvedValue({
      ...resultValidateTokenResetPassword,
      expiresAt: new Date(Date.now() - 100000)
    });

    await expect(
      resetPassword(resetPasswordInput.email, resetPasswordInput.password)
    ).rejects.toMatchObject({
      message: err.message,
      statusCode: err.statusCode
    });
  });

  test('Should throw an AppError when the TokenResetPassword has been marked as used with the message: Token já utilizado; and statusCode: 400', async () => {
    const err = new AppError('Token já utilizado', 400);

    vi.mocked(Repository_Token.validateTokenResetPassword).mockResolvedValue({
      ...resultValidateTokenResetPassword,
      expiresAt: new Date(Date.now() + 100000),
      used: true
    });

    await expect(
      resetPassword(resetPasswordInput.email, resetPasswordInput.password)
    ).rejects.toMatchObject({ statusCode: err.statusCode, message: err.message });
  });

  test('Should call the functions correctly, create new password for the user, and return it.', async () => {
    const newPassword = 'newPassword';
    const hashNewPassword = 'hashNewPassword';

    vi.mocked(Repository_Token.validateTokenResetPassword).mockResolvedValue(
      resultValidateTokenResetPassword
    );
    const spy = vi.spyOn(hashUtils, 'createHashPassword').mockResolvedValue(hashNewPassword);
    vi.mocked(Repository_User.changePassword);
    vi.mocked(Repository_Token.markTokenAsUsed);

    await resetPassword(newPassword, 'token-reset-test');

    expect(spy).toBeCalledWith(newPassword);
    expect(Repository_User.changePassword).toBeCalledWith(
      resultValidateTokenResetPassword.userId,
      hashNewPassword
    );
    expect(Repository_User.changePassword).toBeCalledTimes(1);
    expect(Repository_Token.markTokenAsUsed).toBeCalledWith(resultValidateTokenResetPassword.id);
    expect(Repository_Token.markTokenAsUsed).toBeCalledTimes(1);
  });
});

describe('verifyCodeService', () => {
  const codeFetched = {
    id: 313,
    expiresAt: new Date(),
    userId: 873,
    used: false
  };

  const code = 'code_test';
  const email = 'email_test';
  test('Should throw an AppError if the OTP Code has been expired with the message: Código expirado; and statusCode: 400', async () => {
    const err = new AppError('Código expirado', 400);

    vi.mocked(Repository_OTP.findCodeOTP).mockResolvedValue({
      ...codeFetched,
      expiresAt: new Date(Date.now() - 99999)
    });

    await expect(verifyCodeService).rejects.toMatchObject({
      message: err.message,
      statusCode: err.statusCode
    });
  });

  test('Should throw an AppError if the code has already been used with the message: Código já utilizado; and statusCode: 400', async () => {
    const err = new AppError('Código já utilizado', 400);

    vi.mocked(Repository_OTP.findCodeOTP).mockResolvedValue({
      ...codeFetched,
      expiresAt: new Date(Date.now() + 99999),
      used: true
    });

    await expect(verifyCodeService).rejects.toMatchObject({
      message: err.message,
      statusCode: err.statusCode
    });
  });

  test('Should call the functions correctly, create a token for reset password, save it in database and return', async () => {
    const findByEmailResolved = {
      id: 77,
      password: 'password-test'
    };
    const codeHash = 'codeHash-test';
    const tokenReset = 'tkn-tkn-tkn-tkn-tkn';

    vi.mocked(Repository_User.findByEmail).mockResolvedValue(findByEmailResolved);
    vi.mocked(hashUtils.transformForHash).mockReturnValue(codeHash);
    vi.mocked(Repository_OTP.findCodeOTP).mockResolvedValue({
      ...codeFetched,
      expiresAt: new Date(Date.now() + 9999)
    });
    vi.mocked(hashUtils.tokenUUID).mockReturnValue(tokenReset);
    vi.mocked(Repository_Token.createTokenUUID);

    expect(await verifyCodeService(code, email)).toEqual(tokenReset);
    expect(Repository_Token.createTokenUUID).toBeCalledWith(codeFetched.userId, tokenReset);
    expect(Repository_Token.createTokenUUID).toBeCalledTimes(1);
    expect(Repository_OTP.markCodeAsUsed).toBeCalledWith(codeFetched.id);
  });
});

vi.mock('../../shared/utils/TokenUtils');
vi.mock('../user/user.model');
vi.mock('../device/device.service');
vi.mock('../auth/token.model');
vi.mock('./token.service');
vi.mock('./codeOTP.model');
vi.mock('../../shared/utils/crypto', async () => {
  const actual = await vi.importActual<typeof import('../../shared/utils/crypto')>(
    '../../shared/utils/crypto'
  );

  return {
    ...actual,
    transformForHash: vi.fn()
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
import * as Model_User from '../user/user.model';
import * as Model_Token from '../auth/token.model';
import * as Service_Device from '../device/device.service';
import { AppError } from '../../shared/utils/error';
import * as Service_Token from './token.service';
import * as hashUtils from '../../shared/utils/crypto';
import generateCode from '../../shared/utils/generateCode';
import * as Model_OTP from './codeOTP.model';
import * as mailService from '../../shared/services/mail.service';

describe('emailVerificationAccount', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...OLD_ENV,
      JWT_EMAIL_SECRET: 'EMAIL_SECRET_TEST'
    };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  const { userId, email } = {
    userId: 7,
    email: 'teste@gmail.com'
  };

  test('should throw a dotenv error with the message: JWT_EMAIL_SECRET não definido! and statusCode 500', async () => {
    delete process.env.JWT_EMAIL_SECRET;

    expect(emailVerificationAccount(userId, email)).rejects.toMatchObject({
      message: 'JWT_EMAIL_SECRET não definido!',
      statusCode: 500
    });
  });

  test('should throw an JsonWebTokenError if the parameter type is incorrect with a statusCode of 401.', async () => {
    const jwtError = new jwt.JsonWebTokenError('Token Inválido');

    vi.mocked(generateVerifyToken).mockImplementation(() => {
      throw jwtError;
    });

    expect(emailVerificationAccount).rejects.toMatchObject({
      message: 'Token Inválido',
      statusCode: 401
    });
  });

  test('should throw an AppError for general errors', async () => {
    vi.mocked(generateVerifyToken).mockImplementation(() => {
      throw new Error('Falha inesperada');
    });

    expect(emailVerificationAccount(userId, email)).rejects.toMatchObject({
      message: 'Falha inesperada',
      statusCode: 500
    });
  });
});

describe('verifyTokenEmailAccount', async () => {
  test('Should successfully verify jwt token and call verifyUser function.', async () => {
    const returnModelVerifyUser = {
      verified: true,
      updatedAt: new Date()
    };
    vi.mocked(utilJwtVerifyEmail).mockResolvedValue({ userId: 7 });
    vi.mocked(Model_User.verifyUser).mockResolvedValue(returnModelVerifyUser);

    await verifyTokenEmailAccount('token-test');
    expect(utilJwtVerifyEmail).toBeCalledTimes(1);
    expect(Model_User.verifyUser).toBeCalledWith(7);
    expect(Model_User.verifyUser).toBeCalledTimes(1);
  });
});

describe('verifyTokensLogin', () => {
  test('Should throw an AppError if an invalid access token with status code 401 is encountered.', async () => {
    vi.mocked(utilJwtVerifyAccess).mockRejectedValueOnce(
      new AppError('Token de acesso inválido', 401)
    );

    expect(verifyTokensLogin({ accessToken: 'accessTokenTest' })).rejects.toMatchObject({
      message: 'Token de acesso inválido',
      statusCode: 401
    });
  });

  test('Should validate the deviceId and create news tokens', async () => {
    const sendDeviceUUID = 'deviceuuid-test';
    const verifyTokenDeviceResolved = {
      deviceUUID: sendDeviceUUID,
      userId: 1,
      id: 10
    };

    const newRefreshToken = 'newRefreshTokenFromDevice';
    const newAccessToken = 'newAccessTokenFromDevice';

    vi.mocked(Service_Device.verifyTokenDevice).mockResolvedValue(verifyTokenDeviceResolved);
    vi.mocked(Model_Token.revokeRefreshToken).mockResolvedValueOnce(undefined);
    vi.mocked(Service_Token.createRefreshTokenFromDeviceUUID).mockResolvedValue(newRefreshToken);
    vi.mocked(generateAccessToken).mockReturnValue(newAccessToken);

    const result = await verifyTokensLogin({ deviceId: sendDeviceUUID });

    expect(Service_Token.createRefreshTokenFromDeviceUUID).toBeCalledWith(
      verifyTokenDeviceResolved.userId,
      verifyTokenDeviceResolved.id
    );
    expect(result).toEqual({
      userId: verifyTokenDeviceResolved.userId,
      newAccessToken,
      deviceUUID: verifyTokenDeviceResolved.deviceUUID,
      newRefreshTokenRaw: newRefreshToken
    });
  });

  test('Should throw an AppError if the refresh token is missing.', async () => {
    const error = new AppError('Token de atualização ausente', 401);

    expect(verifyTokensLogin({})).rejects.toMatchObject({
      message: error.message,
      statusCode: error.statusCode
    });
  });

  test('Should access token be created successfully.', async () => {
    const hashRefreshToken = 'tokenHashTest';
    const accessToken = 'tokenAccess';
    const verifyRefreshTokenResolved = {
      userId: 2,
      token: 'tokenHashTest',
      expiresAt: new Date(Date.now() + 10000)
    };
    const resultVerifyTokensLogin = {
      newAccessToken: accessToken,
      userId: verifyRefreshTokenResolved.userId
    };

    vi.mocked(hashUtils.transformForHash).mockReturnValue(hashRefreshToken);
    vi.mocked(Model_Token.verifyRefreshToken).mockResolvedValue(verifyRefreshTokenResolved);
    vi.mocked(generateAccessToken).mockReturnValue(accessToken);

    const result = await verifyTokensLogin({ refreshToken: 'refreshTokenTest' });

    expect(Model_Token.verifyRefreshToken).toBeCalledTimes(1);
    expect(result).toEqual(resultVerifyTokensLogin);
  });
});

describe('forgotPasswordService', () => {
  const email = 'teste@gmail.com';
  test('Should throw an AppError if the user is not found with message: Usuário não encontrado and statusCode 404', async () => {
    const error = new AppError('Usuário não encontrado', 404);

    expect(forgotPasswordService(email)).rejects.toMatchObject({
      message: error.message,
      statusCode: error.statusCode
    });
  });

  test('Should call createCodeOTP function of Model and call the email service for email trigger', async () => {
    const user = {
      id: 10,
      password: 'test-password'
    };
    const code = 'TsT032';
    const hashCodeForgot = 'hashCodeForgot';
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    vi.mocked(Model_User.findByEmail).mockResolvedValue(user);
    vi.mocked(generateCode).mockReturnValue(code);
    vi.mocked(hashUtils.transformForHash).mockReturnValue(hashCodeForgot);
    vi.mocked(Model_OTP.createCodeOTP);
    vi.mocked(mailService.sendForgotPasswordEmail);

    await forgotPasswordService(email);

    expect(Model_OTP.createCodeOTP).toBeCalledTimes(1);
    expect(Model_OTP.createCodeOTP).toBeCalledWith(hashCodeForgot, expiresAt, user.id);
    expect(mailService.sendForgotPasswordEmail).toBeCalledTimes(1);
    expect(mailService.sendForgotPasswordEmail).toBeCalledWith(email, code);
  });
});

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

    expect(
      resetPassword(resetPasswordInput.email, resetPasswordInput.password)
    ).rejects.toMatchObject({
      message: err.message,
      statusCode: err.statusCode
    });
  });

  test('Should throw an AppError when the TokenResetPassword has been expired with the message: Token expirado; and statusCode: 400', async () => {
    const err = new AppError('Token expirado', 400);

    vi.mocked(Model_Token.validateTokenResetPassword).mockResolvedValue({
      ...resultValidateTokenResetPassword,
      expiresAt: new Date(Date.now() - 100000)
    });

    expect(
      resetPassword(resetPasswordInput.email, resetPasswordInput.password)
    ).rejects.toMatchObject({
      message: err.message,
      statusCode: err.statusCode
    });
  });

  test('Should throw an AppError when the TokenResetPassword has been marked as used with the message: Token já utilizado; and statusCode: 400', async () => {
    const err = new AppError('Token já utilizado', 400);

    vi.mocked(Model_Token.validateTokenResetPassword).mockResolvedValue({
      ...resultValidateTokenResetPassword,
      expiresAt: new Date(Date.now() + 100000),
      used: true
    });

    expect(
      resetPassword(resetPasswordInput.email, resetPasswordInput.password)
    ).rejects.toMatchObject({ statusCode: err.statusCode, message: err.message });
  });

  test('Should call the functions correctly, create new password for the user, and return it.', async () => {
    const newPassword = 'newPassword';
    const hashNewPassword = 'hashNewPassword';

    vi.mocked(Model_Token.validateTokenResetPassword).mockResolvedValue(
      resultValidateTokenResetPassword
    );
    const spy = vi.spyOn(hashUtils, 'createHashPassword').mockResolvedValue(hashNewPassword);
    vi.mocked(Model_User.changePassword);
    vi.mocked(Model_Token.markTokenAsUsed);

    await resetPassword(newPassword, 'token-reset-test');

    expect(spy).toBeCalledWith(newPassword);
    expect(Model_User.changePassword).toBeCalledWith(
      resultValidateTokenResetPassword.userId,
      hashNewPassword
    );
    expect(Model_User.changePassword).toBeCalledTimes(1);
    expect(Model_Token.markTokenAsUsed).toBeCalledWith(resultValidateTokenResetPassword.id);
    expect(Model_Token.markTokenAsUsed).toBeCalledTimes(1);
  });
});

describe('verifyCodeService', () => {
  const codeFetched = {
    id: 313,
    expiresAt: new Date(),
    userId: 873,
    used: false
  };
  test('Should throw an AppError if the OTP Code has been expired with the message: Código expirado; and statusCode: 400', async () => {
    const err = new AppError('Código expirado', 400);

    vi.mocked(Model_OTP.findCodeOTP).mockResolvedValue({
      ...codeFetched,
      expiresAt: new Date(Date.now() - 99999)
    });

    expect(verifyCodeService).rejects.toMatchObject({
      message: err.message,
      statusCode: err.statusCode
    });
  });

  test('Should throw an AppError if the code has already been used with the message: Código já utilizado; and statusCode: 400', async () => {
    const err = new AppError('Código já utilizado', 400);

    vi.mocked(Model_OTP.findCodeOTP).mockResolvedValue({
      ...codeFetched,
      expiresAt: new Date(Date.now() + 99999),
      used: true
    });

    expect(verifyCodeService).rejects.toMatchObject({
      message: err.message,
      statusCode: err.statusCode
    });
  });
});

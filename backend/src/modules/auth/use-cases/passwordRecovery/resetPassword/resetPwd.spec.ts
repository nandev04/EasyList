import * as cryptoUtils from '../../../../../shared/utils/crypto.js';
import { AppError } from '../../../../../shared/utils/error.js';
import { createUserId } from '../../../../../shared/utils/uuid.js';
import * as Token_Repository from '../../../repositories/token.repository.js';
import * as User_Repository from '../../../../user/user.repository.js';
import { resetPassword } from './resetPwd.service.js';

describe('resetPassword', () => {
  const fixedNow = 1704067200000;
  const resultValidateTokenResetPassword = {
    id: 31321,
    userId: createUserId(),
    expiresAt: new Date(Date.now() + fixedNow),
    used: false
  };

  const resetPasswordInput = {
    email: 'email@test',
    password: 'password!test'
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Should throw an AppError when the TokenResetPassword is not found with the message: Token não encontrado; and statusCode: 401', async () => {
    const err = new AppError('Token não encontrado', 401);

    vi.spyOn(Token_Repository, 'validateTokenResetPassword').mockResolvedValue(null);

    await expect(
      resetPassword(resetPasswordInput.email, resetPasswordInput.password)
    ).rejects.toMatchObject({
      message: err.message,
      statusCode: err.statusCode
    });
  });

  test('Should throw an AppError when the TokenResetPassword has been expired with the message: Token expirado; and statusCode: 401', async () => {
    const err = new AppError('Token expirado', 401);

    vi.spyOn(Token_Repository, 'validateTokenResetPassword').mockResolvedValue({
      ...resultValidateTokenResetPassword,
      expiresAt: new Date(fixedNow - 100000)
    });

    await expect(
      resetPassword(resetPasswordInput.email, resetPasswordInput.password)
    ).rejects.toMatchObject({
      message: err.message,
      statusCode: err.statusCode
    });
  });

  test('Should throw an AppError when the TokenResetPassword has been marked as used with the message: Token expirado; and statusCode: 401', async () => {
    const err = new AppError('Token expirado', 401);

    vi.spyOn(Token_Repository, 'validateTokenResetPassword').mockResolvedValue({
      ...resultValidateTokenResetPassword,
      expiresAt: new Date(fixedNow + 100000),
      used: true
    });

    await expect(
      resetPassword(resetPasswordInput.email, resetPasswordInput.password)
    ).rejects.toMatchObject({ statusCode: err.statusCode, message: err.message });
  });

  test('Should call the functions correctly, create new password for the user, and return it.', async () => {
    const newPassword = 'newPassword';
    const hashNewPassword = 'hashNewPassword';

    vi.spyOn(Token_Repository, 'validateTokenResetPassword').mockResolvedValue(
      resultValidateTokenResetPassword
    );
    const spyCrypto = vi
      .spyOn(cryptoUtils, 'createHashPassword')
      .mockResolvedValue(hashNewPassword);
    vi.spyOn(User_Repository, 'changePassword').mockResolvedValue(undefined as never);
    vi.spyOn(Token_Repository, 'markTokenAsUsed').mockResolvedValue(undefined as never);

    await resetPassword(newPassword, 'token-reset-test');

    expect(spyCrypto).toBeCalledWith(newPassword);
    expect(User_Repository.changePassword).toBeCalledWith(
      resultValidateTokenResetPassword.userId,
      hashNewPassword
    );
    expect(User_Repository.changePassword).toBeCalledTimes(1);
    expect(Token_Repository.markTokenAsUsed).toBeCalledWith(resultValidateTokenResetPassword.id);
    expect(Token_Repository.markTokenAsUsed).toBeCalledTimes(1);
  });
});

import { AppError } from '../../../../../shared/utils/error.js';
import { verifyCodeService } from './verifyOtp.service.js';
import * as cryptoUtils from '../../../../../shared/utils/crypto.js';
import * as OtpCode_Repository from '../../../repositories/codeOTP.repository.js';
import * as Token_Repository from '../../../repositories/token.repository.js';
import * as User_Repository from '../../../../user/user.repository.js';
import { createUserId } from '../../../../../shared/utils/uuid.js';

describe('verifyOtpService', () => {
  const idUser = createUserId();
  const codeFetched = {
    id: 313,
    userId: idUser,
    used: false
  };
  const userFindByEmail = {
    id: idUser,
    password: 'test-password'
  };

  const code = '123456';
  const email = 'email_test';

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Should throw an AppError if the user email is not found with status code 404 and message error: "Usuário correspondente ao email não encontrado"', async () => {
    const err = new AppError('Usuário correspondente ao email não encontrado', 404);

    vi.spyOn(User_Repository, 'findByEmail').mockResolvedValue(null);

    await expect(verifyCodeService(code, email)).rejects.toMatchObject({
      message: err.message,
      statusCode: err.statusCode
    });
  });

  test('Should throw an AppError if the OTP Code has been expired with the message: Código expirado; and statusCode: 401', async () => {
    const err = new AppError('Código expirado', 401);

    vi.spyOn(User_Repository, 'findByEmail').mockResolvedValue(userFindByEmail);
    vi.spyOn(OtpCode_Repository, 'findCodeOTP').mockResolvedValue({
      ...codeFetched,
      expiresAt: new Date(Date.now() - 99999)
    });

    await expect(verifyCodeService(code, email)).rejects.toMatchObject({
      message: err.message,
      statusCode: err.statusCode
    });
  });

  test('Should throw an AppError if the code has already been used with the message: Código já utilizado; and statusCode: 401', async () => {
    const err = new AppError('Código já utilizado', 401);

    vi.spyOn(User_Repository, 'findByEmail').mockResolvedValue(userFindByEmail);
    vi.spyOn(OtpCode_Repository, 'findCodeOTP').mockResolvedValue({
      ...codeFetched,
      expiresAt: new Date(Date.now() + 99999),
      used: true
    });

    await expect(verifyCodeService(code, email)).rejects.toMatchObject({
      message: err.message,
      statusCode: err.statusCode
    });
  });

  test('Should call the functions correctly, create a token for reset password, save it in database and return', async () => {
    const findByEmailResolved = {
      id: idUser,
      password: 'password-test'
    };
    const codeHash = 'codeHash-test';
    const tokenReset = 'tkn-tkn-tkn-tkn-tkn';

    vi.spyOn(User_Repository, 'findByEmail').mockResolvedValue(findByEmailResolved);
    vi.spyOn(cryptoUtils, 'transformForHash').mockReturnValue(codeHash);
    vi.spyOn(OtpCode_Repository, 'findCodeOTP').mockResolvedValue({
      ...codeFetched,
      expiresAt: new Date(Date.now() + 9999)
    });
    vi.spyOn(OtpCode_Repository, 'markCodeAsUsed').mockReturnValue(undefined as never);
    vi.spyOn(cryptoUtils, 'tokenUUID').mockReturnValue(tokenReset);
    vi.spyOn(Token_Repository, 'createTokenUUID').mockResolvedValue(undefined as never);

    expect(await verifyCodeService(code, email)).toEqual(tokenReset);
    expect(Token_Repository.createTokenUUID).toBeCalledWith(codeFetched.userId, tokenReset);
    expect(Token_Repository.createTokenUUID).toBeCalledTimes(1);
    expect(OtpCode_Repository.markCodeAsUsed).toBeCalledWith(codeFetched.id);
  });
});

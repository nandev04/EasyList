import { AppError } from '../../../../../shared/utils/error.js';
import { verifyCodeService } from './verifyOtp.service.js';
import * as cryptoUtils from '../../../../../shared/utils/crypto/cryptoUtils.js';
import * as OtpCode_Repository from '../../../repositories/codeOTP.repository.js';
import * as Token_Repository from '../../../repositories/token.repository.js';
import * as User_Repository from '../../../../user/user.repository.js';
import * as uuidUtils from '../../../../../shared/utils/uuid/uuidUtils.js';

describe('verifyOtpService', () => {
  const idUser = uuidUtils.generateUUIDv7();
  const codeFetched = {
    id: 313,
    userId: idUser,
    used: false
  };
  const userFindByEmail = {
    id: idUser,
    password: 'test-password',
    tokenVersion: 30
  };

  const code = '123456';
  const email = 'email_test';

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Should throw an AppError if the user email is not found with status code 400 and message error: "Código inválido"', async () => {
    vi.spyOn(User_Repository, 'findByEmail').mockResolvedValue(null);

    await expect(verifyCodeService(code, email)).rejects.toMatchObject({
      message: 'Código inválido',
      statusCode: 400,
      code: 'INVALID_CODE'
    });
  });

  test('Should throw an AppError if the OTP Code has been expired with the message: Código expirado; and statusCode: 410', async () => {
    vi.spyOn(User_Repository, 'findByEmail').mockResolvedValue(userFindByEmail);
    vi.spyOn(OtpCode_Repository, 'findCodeOTP').mockResolvedValue({
      ...codeFetched,
      expiresAt: new Date(Date.now() - 99999)
    });

    await expect(verifyCodeService(code, email)).rejects.toMatchObject({
      message: 'Código expirado',
      statusCode: 410,
      code: 'EXPIRED_CODE'
    });
  });

  test('Should throw an AppError if the code has already been used with the message: Código já utilizado; and statusCode: 410', async () => {
    vi.spyOn(User_Repository, 'findByEmail').mockResolvedValue(userFindByEmail);
    vi.spyOn(OtpCode_Repository, 'findCodeOTP').mockResolvedValue({
      ...codeFetched,
      expiresAt: new Date(Date.now() + 99999),
      used: true
    });

    await expect(verifyCodeService(code, email)).rejects.toMatchObject({
      message: 'Código já utilizado',
      statusCode: 410,
      code: 'USED_CODE'
    });
  });

  test('Should call the functions correctly, create a token for reset password, save it in database and return', async () => {
    const findByEmailResolved = {
      id: idUser,
      password: 'password-test',
      tokenVersion: 30
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
    vi.spyOn(uuidUtils, 'generateUUIDv4').mockReturnValue(tokenReset);
    vi.spyOn(Token_Repository, 'createTokenUUID').mockResolvedValue(undefined as never);

    expect(await verifyCodeService(code, email)).toEqual(tokenReset);
    expect(Token_Repository.createTokenUUID).toBeCalledWith(codeFetched.userId, tokenReset);
    expect(Token_Repository.createTokenUUID).toBeCalledTimes(1);
    expect(OtpCode_Repository.markCodeAsUsed).toBeCalledWith(codeFetched.id);
  });
});

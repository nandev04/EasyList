import { verifyAccountToken, resendAccountToken } from './verifyAcc.service.js';
import * as Respository_User from '../../../user/user.repository.js';
import * as Repository_Auth from '../../repositories/token.repository.js';
import { generateUUIDv7 } from '../../../../shared/utils/uuid/uuidUtils.js';
import * as cryptoUtils from '../../../../shared/utils/crypto/cryptoUtils.js';
import * as mailService from '../../../../shared/services/mail.service.js';

const tokenRaw = 'tokenRawTeste';

describe('verifyAccountToken', async () => {
  test('Should successfully verify token and call verifyUser function.', async () => {
    const tokenHash = 'tokenHashTeste';
    const tokenSearched = {
      userId: generateUUIDv7(),
      expiresAt: new Date(Date.now() * 999999),
      id: 3123,
      revokedAt: null,
      used: false
    };

    vi.spyOn(cryptoUtils, 'transformForHash').mockReturnValue(tokenHash);
    vi.spyOn(Repository_Auth, 'getAccountVerifyToken').mockResolvedValue(tokenSearched);
    vi.spyOn(Repository_Auth, 'markAccountVerifyTokenAsUsed').mockResolvedValue(undefined as never);
    vi.spyOn(Respository_User, 'verifyUser').mockResolvedValue(undefined as never);

    await verifyAccountToken(tokenRaw);

    expect(cryptoUtils.transformForHash).toHaveBeenCalledTimes(1);
    expect(cryptoUtils.transformForHash).toHaveBeenCalledWith(tokenRaw);
    expect(Repository_Auth.getAccountVerifyToken).toHaveBeenCalledWith(tokenHash);
    expect(Repository_Auth.markAccountVerifyTokenAsUsed).toHaveBeenCalledWith(tokenSearched.id);
    expect(Respository_User.verifyUser).toHaveBeenCalledTimes(1);
  });

  test('Should throw an AppError with status code 401 and message: "Token inválido" if the token is not found', async () => {
    const tokenHash = 'tokenHashTeste';

    vi.spyOn(cryptoUtils, 'transformForHash').mockReturnValue(tokenHash);
    vi.spyOn(Repository_Auth, 'getAccountVerifyToken').mockResolvedValue(null);

    await expect(verifyAccountToken).rejects.toMatchObject({
      code: 'INVALID_TOKEN',
      message: 'Token inválido',
      statusCode: 401
    });
  });

  test('Should throw an AppError with status code 400 and message: "Token inválido ou expirado" if the token is revoked', async () => {
    const tokenHash = 'tokenHashTeste';
    const tokenSearched = {
      userId: generateUUIDv7(),
      expiresAt: new Date(Date.now() * 999999),
      id: 3123,
      revokedAt: new Date(Date.now() - 999999999),
      used: false
    };

    vi.spyOn(cryptoUtils, 'transformForHash').mockReturnValue(tokenHash);
    vi.spyOn(Repository_Auth, 'getAccountVerifyToken').mockResolvedValue(tokenSearched);

    await expect(verifyAccountToken).rejects.toMatchObject({
      code: 'INVALID_TOKEN',
      message: 'Token inválido ou expirado',
      statusCode: 410
    });
  });

  test('Should throw an AppError with status code 400 and message: "Token inválido ou expirado" if the token is expired', async () => {
    const tokenHash = 'tokenHashTeste';
    const tokenSearched = {
      userId: generateUUIDv7(),
      expiresAt: new Date(Date.now() - 999999),
      id: 3123,
      revokedAt: null,
      used: false
    };

    vi.spyOn(cryptoUtils, 'transformForHash').mockReturnValue(tokenHash);
    vi.spyOn(Repository_Auth, 'getAccountVerifyToken').mockResolvedValue(tokenSearched);

    await expect(verifyAccountToken).rejects.toMatchObject({
      code: 'INVALID_TOKEN',
      message: 'Token inválido ou expirado',
      statusCode: 410
    });
  });

  test('Should throw an AppError with status code 400 and message: "Token inválido ou expirado" if the token is used', async () => {
    const tokenHash = 'tokenHashTeste';
    const tokenSearched = {
      userId: generateUUIDv7(),
      expiresAt: new Date(Date.now() + 999999),
      id: 3123,
      revokedAt: null,
      used: true
    };

    vi.spyOn(cryptoUtils, 'transformForHash').mockReturnValue(tokenHash);
    vi.spyOn(Repository_Auth, 'getAccountVerifyToken').mockResolvedValue(tokenSearched);

    await expect(verifyAccountToken).rejects.toMatchObject({
      code: 'INVALID_TOKEN',
      message: 'Token inválido ou expirado',
      statusCode: 410
    });
  });
});

describe('resendAccountToken', async () => {
  const email = 'test@example.com';

  test('Should return null if user is not found', async () => {
    vi.spyOn(Respository_User, 'findByEmailNotVerified').mockResolvedValue(null);

    const result = await resendAccountToken(email);

    expect(result).toBeNull();
    expect(Respository_User.findByEmailNotVerified).toHaveBeenCalledWith(email);
  });

  test('Should generate token, revoke old tokens and send verification mail when user exists', async () => {
    const userId = generateUUIDv7();
    const user = { id: userId, email };
    const tokenRawGenerated = 'tokenRawGenerated';
    const tokenHash = 'tokenHashGenerated';
    const tokenCreated = { id: 9999, userId };

    vi.spyOn(Respository_User, 'findByEmailNotVerified').mockResolvedValue(user as never);
    vi.spyOn(cryptoUtils, 'generateToken').mockReturnValue(tokenRawGenerated);
    vi.spyOn(cryptoUtils, 'transformForHash').mockReturnValue(tokenHash);
    vi.spyOn(Repository_Auth, 'createAccountVerifyToken').mockResolvedValue(tokenCreated as never);
    vi.spyOn(Repository_Auth, 'revokeAccountVerifyTokenOld').mockResolvedValue(undefined as never);
    vi.spyOn(mailService, 'accountVerification').mockReturnValue(undefined as never);

    await resendAccountToken(email);

    expect(Respository_User.findByEmailNotVerified).toHaveBeenCalledWith(email);
    expect(cryptoUtils.generateToken).toHaveBeenCalledTimes(1);
    expect(Repository_Auth.createAccountVerifyToken).toHaveBeenCalledTimes(1);
    expect(Repository_Auth.revokeAccountVerifyTokenOld).toHaveBeenCalledWith(
      userId,
      tokenCreated.id
    );
    expect(mailService.accountVerification).toHaveBeenCalledWith(email, tokenRawGenerated);
  });
});

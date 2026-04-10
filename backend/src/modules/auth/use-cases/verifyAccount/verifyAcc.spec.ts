import { generateAccountToken, verifyAccountToken } from './verifyAcc.service.js';
import * as Respository_User from '../../../user/user.repository.js';
import * as Repository_Auth from '../../repositories/token.repository.js';
import * as tokenUtils from '../../../../shared/utils/TokenUtils.js';
import { createUserId } from '../../../../shared/utils/uuid.js';
import * as cryptoUtils from '../../../../shared/utils/crypto.js';

const tokenRaw = 'tokenRawTeste';

describe('verifyAccountToken', async () => {
  test('Should successfully verify token and call verifyUser function.', async () => {
    const tokenHash = 'tokenHashTeste';
    const tokenSearched = {
      userId: createUserId(),
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

  test('Should throw an AppError with status code 404 and message: "Token inválido" if the token is not found', async () => {
    const tokenHash = 'tokenHashTeste';

    vi.spyOn(cryptoUtils, 'transformForHash').mockReturnValue(tokenHash);
    vi.spyOn(Repository_Auth, 'getAccountVerifyToken').mockResolvedValue(null);

    await expect(verifyAccountToken).rejects.toMatchObject({
      message: 'Token inválido',
      statusCode: 404
    });
  });

  test('Should throw an AppError with status code 400 and message: "Token inválido ou expirado" if the token is revoked', async () => {
    const tokenHash = 'tokenHashTeste';
    const tokenSearched = {
      userId: createUserId(),
      expiresAt: new Date(Date.now() * 999999),
      id: 3123,
      revokedAt: new Date(Date.now() - 999999999),
      used: false
    };

    vi.spyOn(cryptoUtils, 'transformForHash').mockReturnValue(tokenHash);
    vi.spyOn(Repository_Auth, 'getAccountVerifyToken').mockResolvedValue(tokenSearched);

    await expect(verifyAccountToken).rejects.toMatchObject({
      message: 'Token inválido ou expirado',
      statusCode: 400
    });
  });

  test('Should throw an AppError with status code 400 and message: "Token inválido ou expirado" if the token is expired', async () => {
    const tokenHash = 'tokenHashTeste';
    const tokenSearched = {
      userId: createUserId(),
      expiresAt: new Date(Date.now() - 999999),
      id: 3123,
      revokedAt: null,
      used: false
    };

    vi.spyOn(cryptoUtils, 'transformForHash').mockReturnValue(tokenHash);
    vi.spyOn(Repository_Auth, 'getAccountVerifyToken').mockResolvedValue(tokenSearched);

    await expect(verifyAccountToken).rejects.toMatchObject({
      message: 'Token inválido ou expirado',
      statusCode: 400
    });
  });

  test('Should throw an AppError with status code 400 and message: "Token inválido ou expirado" if the token is used', async () => {
    const tokenHash = 'tokenHashTeste';
    const tokenSearched = {
      userId: createUserId(),
      expiresAt: new Date(Date.now() + 999999),
      id: 3123,
      revokedAt: null,
      used: true
    };

    vi.spyOn(cryptoUtils, 'transformForHash').mockReturnValue(tokenHash);
    vi.spyOn(Repository_Auth, 'getAccountVerifyToken').mockResolvedValue(tokenSearched);

    await expect(verifyAccountToken).rejects.toMatchObject({
      message: 'Token inválido ou expirado',
      statusCode: 400
    });
  });
});

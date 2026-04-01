import * as User_Repository from '../../../user/user.repository.js';
import * as cryptoUtils from '../../../../shared/utils/crypto.js';
import * as Token_Repository from '../../repositories/token.repository.js';
import * as Device_Repository from '../../../device/device.repository.js';
import { loginUser } from './login.service.js';
import * as Auth_Service from '../../services/createTokens.service.js';
import { createUserId } from '../../../../shared/utils/uuid.js';
import * as TokenVersion_Service from '../../services/tokenVersion.service.js';

beforeEach(() => {
  vi.clearAllMocks();
});
describe('Login Service', () => {
  vi.mock('../../../../infra/cache/cache.service.js', () => ({
    getCache: vi.fn()
  }));
  const resultCreateTokens: Awaited<ReturnType<typeof Auth_Service.createTokens>> = {
    accessToken: 'testeAccess',
    refreshTokenRaw: 'testeRefresh',
    expiresMs: 77777777777,
    deviceUUID: 'testeDeviceUUID',
    expirationDate: new Date(),
    hashRefreshToken: 'hashRefreshTeste'
  };

  const resultCreateRefreshToken: Awaited<ReturnType<typeof Token_Repository.createRefreshToken>> =
    {
      id: 313,
      createdAt: new Date(),
      userId: createUserId(),
      deviceId: 3132,
      expiresAt: new Date(),
      token: 'tokenTeste',
      revokedAt: null
    };

  const returnFindByEmail = { id: 'uuidv7-userId', password: 'testPassword', tokenVersion: 40 };
  const createdDeviceId = 10;

  test('Should throw an AppError if the user email is not found with status code 404 and message error: "Usuário correspondente ao email não encontrado"', async () => {
    const invalidEmail = 'userNotFound@gmail.com';
    const password = 'testPassword';

    vi.spyOn(User_Repository, 'findByEmail').mockResolvedValue(null);

    await expect(loginUser(invalidEmail, password)).rejects.toMatchObject({
      message: 'Usuário correspondente ao email não encontrado',
      statusCode: 404
    });
  });

  test('It should throw a 401 error in case of an invalid password, with the message: Credenciais inválidas.', async () => {
    vi.spyOn(User_Repository, 'findByEmail').mockResolvedValue(returnFindByEmail);
    vi.spyOn(cryptoUtils, 'compareHash').mockResolvedValue(false);

    await expect(loginUser).rejects.toMatchObject({
      message: 'Credenciais inválidas',
      statusCode: 401
    });
  });

  test('Should successfully find the user and create their data for cookies.', async () => {
    vi.spyOn(User_Repository, 'findByEmail').mockResolvedValue(returnFindByEmail);
    vi.spyOn(cryptoUtils, 'compareHash').mockResolvedValue(true);
    vi.spyOn(Auth_Service, 'createTokens').mockResolvedValue(resultCreateTokens);
    vi.spyOn(Device_Repository, 'createDevice').mockResolvedValue({ id: createdDeviceId });
    vi.spyOn(Token_Repository, 'createRefreshToken').mockResolvedValue(resultCreateRefreshToken);
    vi.spyOn(TokenVersion_Service, 'setTokenVersion').mockResolvedValue(undefined as never);

    const emailTeste = 'teste@gmail.com';
    const passwordTeste = 'testePassword';

    const returnLoginUserService = await loginUser(emailTeste, passwordTeste);

    expect(returnLoginUserService).toEqual({
      accessToken: resultCreateTokens.accessToken,
      refreshTokenRaw: resultCreateTokens.refreshTokenRaw,
      expiresMs: resultCreateTokens.expiresMs,
      deviceUUID: resultCreateTokens.deviceUUID
    });

    expect(User_Repository.findByEmail).toBeCalledWith(emailTeste);
    expect(cryptoUtils.compareHash).toBeCalledTimes(1);
    expect(Auth_Service.createTokens).toBeCalledWith(
      returnFindByEmail.id,
      returnFindByEmail.tokenVersion
    );
    expect(Device_Repository.createDevice).toBeCalledWith({
      deviceUUID: resultCreateTokens.deviceUUID,
      userId: returnFindByEmail.id,
      maxDevicePerUser: Number(process.env.MAX_DEVICES_PER_USER)
    });
    expect(Token_Repository.createRefreshToken).toBeCalledWith({
      hashRefreshToken: resultCreateTokens.hashRefreshToken,
      userId: returnFindByEmail.id,
      deviceId: createdDeviceId,
      expiresAt: resultCreateTokens.expirationDate
    });
    expect(Token_Repository.createRefreshToken).toBeCalledTimes(1);
  });
});

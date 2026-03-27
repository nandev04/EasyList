vi.mock('../../../user/user.repository', () => ({
  findByEmail: vi.fn()
}));

vi.mock('../../token.service', () => ({
  createTokens: vi.fn()
}));

vi.mock('../../token.repository', () => ({
  createRefreshToken: vi.fn()
}));

vi.mock('../../../../shared/utils/crypto', () => ({
  compareHash: vi.fn()
}));

vi.mock('../../../device/device.repository', () => ({
  createDevice: vi.fn()
}));

import * as crypto from '../../../shared/utils/crypto.js';
import * as Repository_User from '../../user/user.repository.js';
import * as Service_Token from '../token.service.js';
import * as Repository_Token from '../repositories/token.repository.js';
import * as Repository_Device from '../../device/device.repository.js';
import { loginUser } from '../use-cases/login/login.service.js';

describe('Login flow', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetAllMocks();
    process.env = {
      ...OLD_ENV,
      MAX_DEVICES_PER_USER: '3'
    };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  const resultCreateTokens = {
    accessToken: 'testeAccess',
    refreshTokenRaw: 'testeRefresh',
    expiresMs: 77777777777,
    deviceUUID: 'testeDeviceUUID',
    expirationDate: new Date(),
    hashRefreshToken: 'hashRefreshTeste'
  };

  const resultCreateRefreshToken = {
    id: 313,
    createdAt: new Date(),
    userId: 31234,
    deviceId: 3132,
    expiresAt: new Date(),
    token: 'tokenTeste',
    revokedAt: null
  };

  const returnFindByEmail = { id: 'uuidv7-userId', password: 'testPassword' };
  const resultCreateDeviceId = 10;
  test('Should successfully find the user and create their data for cookies.', async () => {
    vi.mocked(Repository_User.findByEmail).mockResolvedValue(returnFindByEmail);
    vi.spyOn(crypto, 'compareHash').mockResolvedValue(true);
    vi.mocked(Service_Token.createTokens).mockResolvedValue(resultCreateTokens);
    vi.mocked(Repository_Device.createDevice).mockResolvedValue({ id: resultCreateDeviceId });
    vi.mocked(Repository_Token.createRefreshToken).mockResolvedValue(resultCreateRefreshToken);

    const emailTeste = 'teste@gmail.com';
    const passwordTeste = 'testePassword';
    const returnLoginUserService = await loginUser(emailTeste, passwordTeste);

    expect(returnLoginUserService).toEqual({
      accessToken: resultCreateTokens.accessToken,
      refreshTokenRaw: resultCreateTokens.refreshTokenRaw,
      expiresMs: resultCreateTokens.expiresMs,
      deviceUUID: resultCreateTokens.deviceUUID
    });

    expect(Repository_User.findByEmail).toBeCalledWith(emailTeste);
    expect(crypto.compareHash).toBeCalledTimes(1);
    expect(Service_Token.createTokens).toBeCalledWith(returnFindByEmail.id);
    expect(Repository_Device.createDevice).toBeCalledWith({
      deviceUUID: resultCreateTokens.deviceUUID,
      userId: returnFindByEmail.id,
      maxDevicePerUser: Number(process.env.MAX_DEVICES_PER_USER)
    });
    expect(Repository_Token.createRefreshToken).toBeCalledWith({
      hashRefreshToken: resultCreateTokens.hashRefreshToken,
      userId: returnFindByEmail.id,
      deviceId: resultCreateDeviceId,
      expiresAt: resultCreateTokens.expirationDate
    });
    expect(Repository_Token.createRefreshToken).toBeCalledTimes(1);
  });

  test('It should throw a 401 error in case of an invalid password, with the message: Credenciais inválidas.', async () => {
    vi.mocked(Repository_User.findByEmail).mockResolvedValue(returnFindByEmail);
    const verifyHash = await crypto.compareHash('wrong-password', returnFindByEmail.password);

    expect(verifyHash).toBeFalsy();
    await expect(loginUser).rejects.toMatchObject({
      message: 'Credenciais inválidas',
      statusCode: 401
    });
  });
});

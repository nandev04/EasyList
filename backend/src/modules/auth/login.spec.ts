vi.mock('../user/user.model', () => ({
  findByEmail: vi.fn()
}));

vi.mock('./token.service', () => ({
  createTokens: vi.fn()
}));

vi.mock('./token.model', () => ({
  createRefreshToken: vi.fn()
}));

vi.mock('../../shared/utils/crypto', () => ({
  compareHash: vi.fn()
}));

vi.mock('../device/device.model', () => ({
  createDevice: vi.fn()
}));

import * as crypto from '../../shared/utils/crypto';
import * as Model_User from '../user/user.model';
import * as Service_Token from './token.service';
import * as Model_Token from './token.model';
import * as Model_Device from '../device/device.model';
import { loginUser } from './login.service';

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

  const returnFindByEmail = { id: 777, password: 'testPassword' };
  const resultCreateDeviceId = 10;
  test('Should successfully find the user and create their data for cookies.', async () => {
    vi.mocked(Model_User.findByEmail).mockResolvedValue(returnFindByEmail);
    vi.spyOn(crypto, 'compareHash').mockResolvedValue(true);
    vi.mocked(Service_Token.createTokens).mockResolvedValue(resultCreateTokens);
    vi.mocked(Model_Device.createDevice).mockResolvedValue({ id: resultCreateDeviceId });
    vi.mocked(Model_Token.createRefreshToken).mockResolvedValue(resultCreateRefreshToken);

    const emailTeste = 'teste@gmail.com';
    const passwordTeste = 'testePassword';
    const returnLoginUserService = await loginUser(emailTeste, passwordTeste);

    expect(returnLoginUserService).toEqual({
      accessToken: resultCreateTokens.accessToken,
      refreshTokenRaw: resultCreateTokens.refreshTokenRaw,
      expiresMs: resultCreateTokens.expiresMs,
      deviceUUID: resultCreateTokens.deviceUUID
    });

    expect(Model_User.findByEmail).toBeCalledWith(emailTeste);
    expect(crypto.compareHash).toBeCalledTimes(1);
    expect(Service_Token.createTokens).toBeCalledWith(returnFindByEmail.id);
    expect(Model_Device.createDevice).toBeCalledWith({
      deviceUUID: resultCreateTokens.deviceUUID,
      userId: returnFindByEmail.id,
      maxDevicePerUser: Number(process.env.MAX_DEVICES_PER_USER)
    });
    expect(Model_Token.createRefreshToken).toBeCalledWith({
      hashRefreshToken: resultCreateTokens.hashRefreshToken,
      userId: returnFindByEmail.id,
      deviceId: resultCreateDeviceId,
      expiresAt: resultCreateTokens.expirationDate
    });
    expect(Model_Token.createRefreshToken).toBeCalledTimes(1);
  });

  test('It should throw a 401 error in case of an invalid password, with the message: Credenciais inválidas.', async () => {
    vi.mocked(Model_User.findByEmail).mockResolvedValue(returnFindByEmail);
    const verifyHash = await crypto.compareHash('wrong-password', returnFindByEmail.password);

    expect(verifyHash).toBeFalsy();
    await expect(loginUser).rejects.toMatchObject({
      message: 'Credenciais inválidas',
      statusCode: 401
    });
  });
});

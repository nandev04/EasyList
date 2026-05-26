import { AppError } from '../../../../shared/utils/error.js';
import { generateUUIDv4 } from '../../../../shared/utils/uuid/uuidUtils.js';
import { generateUUIDv7 } from '../../../../shared/utils/uuid/uuidUtils.js';
import { resolveSessionToken } from './resolveSession.service.js';
import * as accessTokenUtils from '../../../../shared/utils/jwt/accessToken.js';
import * as Service_RenewAccessToken from './renewAccessToken.service.js';
import * as Service_ResolveByDevice from './tryResolveByDevice.service.js';

vi.mock('../../../../infra/cache/cache.service.js', () => ({
  getCache: vi.fn()
}));

describe('resolveSessionToken', () => {
  test('Should throw an AppError if an invalid access token with status code 401 is encountered.', async () => {
    vi.spyOn(accessTokenUtils, 'utilJwtVerifyAccess').mockRejectedValueOnce(
      new AppError('Token de acesso inválido', 401, '')
    );

    await expect(resolveSessionToken({ accessToken: 'accessTokenTest' })).rejects.toMatchObject({
      message: 'Token de acesso inválido',
      statusCode: 401
    });
  });

  test('Should validate the deviceId and create news tokens', async () => {
    const deviceId = generateUUIDv4();
    const tryResolveByDeviceReturn: Awaited<ReturnType<typeof Service_ResolveByDevice.default>> = {
      userId: generateUUIDv7(),
      deviceId,
      newAccessToken: 'accessTokenTest',
      newRefreshTokenRaw: 'refreshTokenTest'
    };

    vi.spyOn(Service_ResolveByDevice, 'default').mockResolvedValue(tryResolveByDeviceReturn);

    const result = await resolveSessionToken({ deviceId });

    expect(Service_ResolveByDevice.default).toBeCalledTimes(1);
    expect(result).toEqual(tryResolveByDeviceReturn);
  });

  test('Should throw an AppError if the refresh token is missing.', async () => {
    const error = new AppError('Token de atualização ausente', 401, '');

    await expect(resolveSessionToken({})).rejects.toMatchObject({
      message: error.message,
      statusCode: error.statusCode
    });
  });

  test('Should access token be created successfully.', async () => {
    const renewAccessTokenReturn: Awaited<ReturnType<typeof Service_RenewAccessToken.default>> = {
      deviceId: generateUUIDv4(),
      newAccessToken: 'accessToken-test',
      userId: generateUUIDv7()
    };
    vi.spyOn(Service_RenewAccessToken, 'default').mockResolvedValue(renewAccessTokenReturn);

    const result = await resolveSessionToken({ refreshToken: 'refreshTokenTest' });

    expect(Service_RenewAccessToken.default).toBeCalledTimes(1);
    expect(result).toEqual(renewAccessTokenReturn);
  });
});

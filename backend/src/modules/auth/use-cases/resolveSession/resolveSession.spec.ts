import { AppError } from '../../../../shared/utils/error.js';
import generateDeviceId from '../../../../shared/utils/generateDeviceId.js';
import { utilJwtVerifyAccess } from '../../../../shared/utils/TokenUtils.js';
import { createUserId } from '../../../../shared/utils/uuid.js';
import renewAccessToken from './renewAccessToken.service.js';
import { resolveSessionToken } from './resolveSession.service.js';
import tryResolveByDevice from './tryResolveByDevice.service.js';

vi.mock('../../../../shared/utils/TokenUtils.js');
vi.mock('./tryResolveByDevice.service.js');
vi.mock('./renewAccessToken.service.js');
vi.mock('../../../../infra/cache/cache.service.js', () => ({
  getCache: vi.fn()
}));

describe('resolveSessionToken', () => {
  test('Should throw an AppError if an invalid access token with status code 401 is encountered.', async () => {
    vi.mocked(utilJwtVerifyAccess).mockRejectedValueOnce(
      new AppError('Token de acesso inválido', 401)
    );

    await expect(resolveSessionToken({ accessToken: 'accessTokenTest' })).rejects.toMatchObject({
      message: 'Token de acesso inválido',
      statusCode: 401
    });
  });

  test('Should validate the deviceId and create news tokens', async () => {
    const deviceUUID = generateDeviceId();
    const tryResolveByDeviceReturn: Awaited<ReturnType<typeof tryResolveByDevice>> = {
      userId: createUserId(),
      deviceUUID,
      newAccessToken: 'accessTokenTest',
      newRefreshTokenRaw: 'refreshTokenTest'
    };

    vi.mocked(tryResolveByDevice).mockResolvedValue(tryResolveByDeviceReturn);

    const result = await resolveSessionToken({ deviceId: deviceUUID });

    expect(tryResolveByDevice).toBeCalledTimes(1);
    expect(result).toEqual(tryResolveByDeviceReturn);
  });

  test('Should throw an AppError if the refresh token is missing.', async () => {
    const error = new AppError('Token de atualização ausente', 401);

    await expect(resolveSessionToken({})).rejects.toMatchObject({
      message: error.message,
      statusCode: error.statusCode
    });
  });

  test('Should access token be created successfully.', async () => {
    const REDIS_URL = 'testt';
    const renewAccessTokenReturn: Awaited<ReturnType<typeof renewAccessToken>> = {
      deviceUUID: generateDeviceId(),
      newAccessToken: 'accessToken-test',
      userId: createUserId()
    };
    vi.mocked(renewAccessToken).mockResolvedValue(renewAccessTokenReturn);

    const result = await resolveSessionToken({ refreshToken: 'refreshTokenTest' });

    expect(renewAccessToken).toBeCalledTimes(1);
    expect(result).toEqual(renewAccessTokenReturn);
  });
});

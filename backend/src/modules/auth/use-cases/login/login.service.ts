import { AppError } from '../../../../shared/utils/error.js';
import * as Repository_Token from '../../repositories/token.repository.js';
import * as Service_Token from './../../token.service.js';
import * as Repository_User from '../../../user/user.repository.js';
import * as Repository_Device from '../../../device/device.repository.js';
import { compareHash } from '../../../../shared/utils/crypto.js';

const loginUser = async (email: string, password: string) => {
  const user = await Repository_User.findByEmail(email);
  const verifyHash = await compareHash(password, user.password);

  if (!verifyHash) throw new AppError('Credenciais inválidas', 401);

  const { accessToken, refreshTokenRaw, expiresMs, deviceUUID, expirationDate, hashRefreshToken } =
    await Service_Token.createTokens(user.id);

  const maxDevicePerUser = Number(process.env.MAX_DEVICES_PER_USER);
  const { id } = await Repository_Device.createDevice({
    deviceUUID,
    userId: user.id,
    maxDevicePerUser
  });
  await Repository_Token.createRefreshToken({
    hashRefreshToken,
    userId: user.id,
    deviceId: id,
    expiresAt: expirationDate
  });

  return { accessToken, refreshTokenRaw, expiresMs, deviceUUID };
};

export { loginUser };

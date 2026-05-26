import { AppError } from '../../../../shared/utils/error.js';
import * as Token_Repository from '../../repositories/token.repository.js';
import * as User_Repository from '../../../user/user.repository.js';
import * as Device_Repository from '../../../device/device.repository.js';
import { compareHashPassword } from '../../../../shared/utils/argon2/argon2Utils.js';
import * as Auth_Service from '../../services/createTokens.service.js';
import { setTokenVersion } from '../../services/tokenVersion.service.js';
import { env } from '../../../../config/env.js';

const loginUser = async (email: string, password: string) => {
  const user = await User_Repository.findByEmail(email);
  if (!user) throw new AppError('Credenciais inválidas', 401, 'INVALID_CREDENTIALS');

  const verifyHash = await compareHashPassword(password, user.password);

  if (!verifyHash) throw new AppError('Credenciais inválidas', 401, 'INVALID_CREDENTIALS');

  const { accessToken, refreshTokenRaw, expiresMs, deviceUUID, expirationDate, hashRefreshToken } =
    await Auth_Service.createTokens(user.id, user.tokenVersion);

  const maxDevicePerUser = Number(env.MAX_DEVICES_PER_USER);
  const { id } = await Device_Repository.createDevice({
    deviceUUID,
    userId: user.id,
    maxDevicePerUser
  });
  await Token_Repository.createRefreshToken({
    hashRefreshToken,
    userId: user.id,
    deviceId: id,
    expiresAt: expirationDate
  });

  await setTokenVersion(user.id, user.tokenVersion);

  return { accessToken, refreshTokenRaw, expiresMs, deviceUUID };
};

export { loginUser };

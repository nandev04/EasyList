import bcrypt from 'bcrypt';
import { AppError } from '../../shared/utils/error.js';
import * as Model_Token from './token.model.js';
import * as Service_Token from './token.service.js';
import * as Model_Login from './login.model.js';
import * as Model_User from '../user/user.model.js';
import * as Model_Device from '../device/device.model.js';

const loginUser = async (email: string, password: string) => {
  const user = await Model_User.findByEmail(email);
  const verifyHash = await bcrypt.compare(password, user.password);

  if (!verifyHash) throw new AppError('Credenciais inválidas', 401);

  const { accessToken, refreshTokenRaw, expiresMs, deviceUUID, expirationDate, hashRefreshToken } =
    await Service_Token.createTokens(user.id);

  const maxDevicePerUser = Number(process.env.MAX_DEVICES_PER_USER);
  const { id } = await Model_Device.createDevice({ deviceUUID, userId: user.id, maxDevicePerUser });
  await Model_Token.createRefreshToken({
    hashRefreshToken,
    userId: user.id,
    deviceId: id,
    expiresAt: expirationDate
  });

  return { accessToken, refreshTokenRaw, expiresMs, deviceUUID };
};

export { loginUser };

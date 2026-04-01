import { AppError } from '../../../../shared/utils/error.js';
import * as Token_Repository from '../../repositories/token.repository.js';
import * as User_Repository from '../../../user/user.repository.js';
import * as Device_Repository from '../../../device/device.repository.js';
import { compareHash } from '../../../../shared/utils/crypto.js';
import * as Auth_Service from '../../services/createTokens.service.js';

const loginUser = async (email: string, password: string) => {
  const user = await User_Repository.findByEmail(email);
  if (!user) throw new AppError('Usuário correspondente ao email não encontrado', 404);

  const verifyHash = await compareHash(password, user.password);

  if (!verifyHash) throw new AppError('Credenciais inválidas', 401);

  const { accessToken, refreshTokenRaw, expiresMs, deviceUUID, expirationDate, hashRefreshToken } =
    await Auth_Service.createTokens(user.id);

  const maxDevicePerUser = Number(process.env.MAX_DEVICES_PER_USER);
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

  return { accessToken, refreshTokenRaw, expiresMs, deviceUUID };
};

export { loginUser };

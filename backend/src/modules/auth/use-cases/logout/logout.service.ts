import * as Device_Repository from '../../../device/device.repository.js';
import * as Auth_Service from '../../services/revokeTokens.service.js';

const logout = async (refreshToken: string) => await Auth_Service.revokeRefreshToken(refreshToken);

const revokeDevice = async (deviceUUID: string) =>
  await Device_Repository.revokeDeviceByUUID(deviceUUID);

export { logout, revokeDevice };

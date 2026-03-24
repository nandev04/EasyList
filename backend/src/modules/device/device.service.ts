import * as Repository_Device from './device.repository.js';

const verifyTokenDevice = async (deviceId: string) => {
  const deviceUUIDRecovered = await Repository_Device.verifyDeviceId(deviceId);
  return deviceUUIDRecovered ?? null;
};

export { verifyTokenDevice };

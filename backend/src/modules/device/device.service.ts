import * as Model_Device from '../device/device.model.js';

const verifyTokenDevice = async (deviceId: string) => {
  const deviceUUIDRecovered = await Model_Device.verifyDeviceId(deviceId);
  return deviceUUIDRecovered ?? null;
};

export { verifyTokenDevice };

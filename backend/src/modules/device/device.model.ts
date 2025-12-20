import { createDevicesType } from './device.type.js';
import prisma from '../../lib/prisma.js';
import { AppError } from '../../shared/utils/error.js';

const createDevice = async ({ deviceUUID, userId, maxDevicePerUser }: createDevicesType) => {
  const allDevices = await prisma.device.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' }
  });

  if (allDevices.length >= maxDevicePerUser)
    await prisma.device.delete({
      where: { id: allDevices[0].id }
    });

  return await prisma.device.create({
    data: { deviceUUID, userId },
    select: { id: true }
  });
};

const verifyDeviceId = async (deviceId: string) => {
  const deviceUUID = await prisma.device.findUnique({
    where: {
      deviceUUID: deviceId
    },
    select: { deviceUUID: true, userId: true, id: true }
  });
  if (!deviceUUID) throw new AppError('DeviceUUID não encontrado', 404);
  return deviceUUID;
};

export { createDevice, verifyDeviceId };

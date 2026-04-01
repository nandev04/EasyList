import { createDevicesType } from './device.type.js';
import prisma from '../../infra/database/prismaClient.js';
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

const verifyDeviceUUID = async (deviceUUID: string) => {
  const deviceUUUIDrecovered = await prisma.device.findUnique({
    where: { deviceUUID },
    select: { deviceUUID: true, userId: true, id: true }
  });
  return deviceUUUIDrecovered;
};

export { createDevice, verifyDeviceUUID };

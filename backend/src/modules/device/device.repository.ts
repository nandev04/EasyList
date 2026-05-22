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
  const deviceUUUIDrecovered = await prisma.device.findFirst({
    where: { deviceUUID, revokedAt: null },
    select: { deviceUUID: true, userId: true, id: true }
  });
  return deviceUUUIDrecovered;
};

const revokeDeviceByUUID = async (deviceUUID: string) => {
  await prisma.device.updateMany({
    where: { deviceUUID, revokedAt: null },
    data: { revokedAt: new Date() }
  });
};

export { createDevice, verifyDeviceUUID, revokeDeviceByUUID };

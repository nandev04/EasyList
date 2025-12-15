import { createDevicesType } from '../typesAndInterfaces/createTokens.js';
import prisma from '../lib/prisma.js';

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

export { createDevice };

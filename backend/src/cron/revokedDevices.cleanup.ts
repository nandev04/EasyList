import cron from 'node-cron';
import prisma from '../infra/database/prismaClient.js';

const revokedDevicesCleanup = () => {
  cron.schedule('10 4 * * *', async () => {
    console.log('[CRON] Iniciando limpeza de dispositivos revogados...');

    try {
      const result = await prisma.device.deleteMany({
        where: {
          revokedAt: { not: null }
        }
      });
      console.log(`[CRON] Limpeza concluída. Dispositivos revogados removidos: ${result.count}`);
    } catch (err) {
      console.error('[CRON] Erro ao limpar dispositivos revogados:', err);
    }
  });
};

export default revokedDevicesCleanup;

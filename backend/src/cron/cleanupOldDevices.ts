import cron from 'node-cron';
import prisma from '../lib/prisma.js';

export const cleanupOldDevices = () => {
  cron.schedule('0 3 * * *', async () => {
    console.log('[CRON] Iniciando limpeza de dispositivos antigos...');

    const DateFormatThirtyDays = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    try {
      const result = await prisma.device.deleteMany({
        where: {
          createdAt: {
            lt: DateFormatThirtyDays
          }
        }
      });
      console.log(`[CRON] Limpeza concluída. Dispositivos removidos: ${result.count}`);
    } catch (err) {
      console.error('[CRON] Erro ao limpar os dispositivos:', err);
    }
  });
};

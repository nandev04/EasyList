import cron from 'node-cron';
import prisma from '../lib/prisma.js';

const cleanResetCodeDb = () => {
  cron.schedule('0 3 * * *', async () => {
    console.log('[CRON] Iniciando limpeza de códigos de reset de senha expirados...');

    const now = new Date();

    try {
      const result = await prisma.passwordResetOTP.deleteMany({
        where: {
          expiresAt: {
            lt: now
          }
        }
      });

      console.log(`[CRON] Limpeza concluída. Códigos removidos: ${result.count}`);
    } catch (err) {
      console.error('[CRON] Erro ao limpar códigos de reset de senha:', err);
    }
  });
};

export default cleanResetCodeDb;

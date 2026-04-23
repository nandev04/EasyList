import cron from 'node-cron';
import prisma from '../infra/database/prismaClient.js';

const cleanRefreshTokenDb = () => {
  cron.schedule('30 3 * * *', async () => {
    console.log('[CRON] Iniciando limpeza de refreshTokens expirados e revogados...');

    const now = new Date();

    try {
      const result = await prisma.refreshToken.deleteMany({
        where: {
          OR: [
            {
              expiresAt: {
                lt: now
              }
            },
            { revokedAt: { not: null } }
          ]
        }
      });

      console.log(`[CRON] Limpeza concluída. Tokens removidos: ${result.count}`);
    } catch (err) {
      console.error('[CRON] Erro ao limpar refreshTokens:', err);
    }
  });
};

export default cleanRefreshTokenDb;

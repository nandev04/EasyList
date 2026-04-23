import cron from 'node-cron';
import prisma from '../infra/database/prismaClient.js';

const cleanRefreshTokenDb = () => {
  cron.schedule('50 3 * * *', async () => {
    console.log(
      '[CRON] Iniciando limpeza de tokens de verificação de conta expirados, revogados e usados...'
    );

    const now = new Date();

    try {
      const result = await prisma.accountVerificationToken.deleteMany({
        where: { OR: [{ revokedAt: { not: null } }, { used: true }, { expiresAt: { lt: now } }] }
      });

      console.log(`[CRON] Limpeza concluída. Tokens removidos: ${result.count}`);
    } catch (err) {
      console.error('[CRON] Erro ao limpar refreshTokens:', err);
    }
  });
};

export default cleanRefreshTokenDb;

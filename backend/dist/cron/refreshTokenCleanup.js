import cron from 'node-cron';
import prisma from '../lib/prisma.js';
const cleanRefreshTokenDb = () => {
    cron.schedule('0 3 * * *', async () => {
        console.log('[CRON] Iniciando limpeza de refreshTokens expirados...');
        const now = new Date();
        try {
            const result = await prisma.refreshToken.deleteMany({
                where: {
                    expiresAt: {
                        lt: now
                    }
                }
            });
            console.log(`[CRON] Limpeza concluída. Tokens removidos: ${result.count}`);
        }
        catch (err) {
            console.error('[CRON] Erro ao limpar refreshTokens:', err);
        }
    });
};
export default cleanRefreshTokenDb;

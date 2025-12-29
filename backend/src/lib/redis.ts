import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.REDIS_URL) throw new Error('REDIS_URL não definido!');
const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy(retries) {
      if (retries > 5) {
        console.error('Não conseguiu reconectar ao Redis');
        return new Error('Max retries reached');
      }
      return 10000;
    }
  }
});

redisClient.on('error', (err) => {
  console.error('Redis client error: ' + err);
});

await redisClient.connect();
console.log('Redis conectado!');

export { redisClient };

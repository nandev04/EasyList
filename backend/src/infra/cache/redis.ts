import { createClient } from 'redis';
import { env } from '../../config/env.js';

const redis = createClient({
  url: env.REDIS_URL,
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

redis.on('error', (err) => {
  console.error('Redis client error: ' + err);
});

await redis.connect();
console.log('Redis conectado!');

export { redis };

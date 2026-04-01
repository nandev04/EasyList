import { redis } from './redis.js';

type ExpirationType = 'EX' | 'PX' | 'EXAT' | 'PXAT';

async function getCache(key: string) {
  return redis.get(key);
}

async function setCache(
  key: string,
  value: string | number,
  typeExpiration: ExpirationType,
  expirationValue: number
) {
  return redis.set(key, value, { expiration: { type: typeExpiration, value: expirationValue } });
}

async function deleteCache(key: string) {
  return redis.del(key);
}

export { getCache, setCache, deleteCache };

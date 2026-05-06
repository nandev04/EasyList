import ms, { StringValue } from 'ms';
import { env } from '../../../config/env.js';

const generateRefreshExpirationDate = () => {
  const expiresMs = ms(env.TOKEN_REFRESH_EXPIRES_IN);

  const expirationDate = new Date(Date.now() + expiresMs);
  return { expirationDate, expiresMs };
};

export { generateRefreshExpirationDate };

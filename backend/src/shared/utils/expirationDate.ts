import ms from 'ms';

export const generateRefreshExpirationDate = () => {
  const expiresMs = ms(process.env.TOKEN_REFRESH_EXPIRES_IN as ms.StringValue);

  const expirationDate = new Date(Date.now() + expiresMs);
  return { expirationDate, expiresMs };
};

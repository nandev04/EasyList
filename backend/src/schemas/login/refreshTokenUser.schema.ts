import { z } from 'zod';

type RefreshTokenUserCookieType = z.infer<typeof refreshTokenUserCookieSchema>;

const refreshTokenUserCookieSchema = z.object({
  token: z.string().min(1)
});

export { refreshTokenUserCookieSchema, RefreshTokenUserCookieType };

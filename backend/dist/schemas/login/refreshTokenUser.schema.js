import { z } from 'zod';
const refreshTokenUserCookieSchema = z.object({
    token: z.string().min(1)
});
export { refreshTokenUserCookieSchema };

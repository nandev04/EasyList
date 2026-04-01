import z from 'zod';

type RefreshTknUserCookieType = z.infer<typeof refreshTknUserCookieSchema>;
const refreshTknUserCookieSchema = z.object({
  token: z.string().min(1)
});

export { refreshTknUserCookieSchema, RefreshTknUserCookieType };

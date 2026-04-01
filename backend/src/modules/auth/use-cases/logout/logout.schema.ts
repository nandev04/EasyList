import { z } from 'zod';

type signedCookieSchemaType = z.infer<typeof signedCookiesSchema>;

const signedCookiesSchema = z.object({
  refreshToken: z.string().min(1),
  accessToken: z.string().min(1),
  deviceId: z.string().min(1)
});

export { signedCookiesSchema, signedCookieSchemaType };

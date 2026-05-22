import { z } from 'zod';

type signedCookieSchemaType = z.infer<typeof signedCookiesSchema>;

const signedCookiesSchema = z.object({
  refreshToken: z.string().optional(),
  accessToken: z.string().optional(),
  deviceId: z.string().optional()
});

export { signedCookiesSchema, signedCookieSchemaType };

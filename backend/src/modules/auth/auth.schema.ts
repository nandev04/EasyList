import { z } from 'zod';

type resetPasswordBodyType = z.infer<typeof resetPasswordBodySchema>;

type signedCookieSchemaType = z.infer<typeof signedCookiesSchema>;

const resetPasswordBodySchema = z.object({
  newPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').max(100),
  tokenResetPassword: z.uuid()
});

const signedCookiesSchema = z.object({
  refreshToken: z.string().min(1),
  accessToken: z.string().min(1),
  deviceId: z.string().min(1)
});

export {
  resetPasswordBodySchema,
  resetPasswordBodyType,
  signedCookiesSchema,
  signedCookieSchemaType
};

import { z } from 'zod';

type VerifyCodeBodySchemaType = z.infer<typeof verifyCodeBodySchema>;

type resetPasswordBodyType = z.infer<typeof resetPasswordBodySchema>;

type signedCookieSchemaType = z.infer<typeof signedCookiesSchema>;

const verifyCodeBodySchema = z.object({
  code: z.string().length(6, 'O código deve ter exatamente 6 caracteres'),
  email: z.email()
});

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
  verifyCodeBodySchema,
  VerifyCodeBodySchemaType,
  resetPasswordBodySchema,
  resetPasswordBodyType,
  signedCookiesSchema,
  signedCookieSchemaType
};

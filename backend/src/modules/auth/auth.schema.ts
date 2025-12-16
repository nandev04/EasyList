import { z } from 'zod';

type VerifyCodeBodySchemaType = z.infer<typeof verifyCodeBodySchema>;
type verifyUserQuerySchemaType = z.infer<typeof verifyUserQuerySchema>;
type resetPasswordBodyType = z.infer<typeof resetPasswordBodySchema>;
type forgotPasswordBodyType = z.infer<typeof forgotPasswordBodySchema>;
type RefreshTokenUserCookieType = z.infer<typeof refreshTokenUserCookieSchema>;
type loginUserBodySchemaType = z.infer<typeof loginUserBodySchema>;

const refreshTokenUserCookieSchema = z.object({
  token: z.string().min(1)
});

const verifyCodeBodySchema = z.object({
  code: z.string().min(1),
  email: z.email()
});

const verifyUserQuerySchema = z.object({
  token: z.string().min(1, 'Token is required')
});

const resetPasswordBodySchema = z.object({
  newPassword: z.string().min(6).max(100),
  tokenResetPassword: z.uuid()
});

const forgotPasswordBodySchema = z.object({
  email: z.email().min(1)
});

const loginUserBodySchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').max(100)
});

export {
  verifyCodeBodySchema,
  VerifyCodeBodySchemaType,
  verifyUserQuerySchema,
  verifyUserQuerySchemaType,
  resetPasswordBodySchema,
  resetPasswordBodyType,
  forgotPasswordBodySchema,
  forgotPasswordBodyType,
  refreshTokenUserCookieSchema,
  RefreshTokenUserCookieType,
  loginUserBodySchema,
  loginUserBodySchemaType
};

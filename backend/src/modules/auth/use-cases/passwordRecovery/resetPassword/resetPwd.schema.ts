import z from 'zod';

type resetPasswordBodyType = z.infer<typeof resetPasswordBodySchema>;
const resetPasswordBodySchema = z.object({
  newPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').max(100),
  tokenResetPassword: z.uuid()
});

export { resetPasswordBodySchema, resetPasswordBodyType };

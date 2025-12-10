import { z } from 'zod';

type resetPasswordBodyType = z.infer<typeof resetPasswordBodySchema>;

const resetPasswordBodySchema = z.object({
  newPassword: z.string().min(6).max(100),
  tokenResetPassword: z.uuid()
});

export { resetPasswordBodySchema, resetPasswordBodyType };

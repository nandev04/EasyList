import z from 'zod';

type changePasswordBodyType = z.infer<typeof changePasswordBodySchema>;
const changePasswordBodySchema = z.object({
  currentPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').max(100),
  newPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').max(100)
});

export { changePasswordBodySchema, changePasswordBodyType };

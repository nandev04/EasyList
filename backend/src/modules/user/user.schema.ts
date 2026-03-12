import { z } from 'zod';

type CreateUserBodySchemaType = z.infer<typeof createUserBodySchema>;
type updateUserSchemaBodyType = z.infer<typeof updateUserSchemaBody>;
type verifyOTPEmailChangeType = z.infer<typeof verifyOTPEmailChange>;

const createUserBodySchema = z.object({
  username: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres')
    .max(30, 'O nome de usuário deve ter no máximo 30 caracteres'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').max(100),
  email: z.email()
});

const updateUserSchemaBody = z
  .object({
    username: z
      .string()
      .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres')
      .max(30, 'O nome de usuário deve ter no máximo 30 caracteres')
      .optional(),
    email: z.email().optional()
  })
  .strict();

const verifyOTPEmailChange = z.object({
  code: z.string().length(6, 'O código deve ter exatamente 6 caracteres')
});

export {
  createUserBodySchema,
  CreateUserBodySchemaType,
  updateUserSchemaBody,
  updateUserSchemaBodyType,
  verifyOTPEmailChange,
  verifyOTPEmailChangeType
};

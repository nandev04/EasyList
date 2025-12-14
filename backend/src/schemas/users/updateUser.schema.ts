import { z } from 'zod';

type updateUserSchemaBodyType = z.infer<typeof updateUserSchemaBody>;

const updateUserSchemaBody = z
  .object({
    username: z
      .string()
      .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres')
      .max(30, 'O nome de usuário deve ter no máximo 30 caracteres')
      .optional()
  })
  .strict();

export { updateUserSchemaBody, updateUserSchemaBodyType };

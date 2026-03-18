import { z } from "zod";

export type updateUserSchemaType = z.infer<typeof updateUserSchema>;

export const updateUserSchema = z.object({
  firstname: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .optional(),
  lastname: z
    .string()
    .min(2, "O sobrenome deve ter pelo menos 2 caracteres")
    .max(100, "O sobrenome deve ter no máximo 100 caracteres")
    .optional(),
  username: z
    .string()
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
    .max(30, "O nome de usuário deve ter no máximo 30 caracteres")
    .optional(),
  email: z.email().optional(),
});

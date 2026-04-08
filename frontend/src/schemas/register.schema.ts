import z from "zod";

export type registerSchemaType = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
  firstname: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  lastname: z
    .string()
    .min(2, "O sobrenome deve ter pelo menos 2 caracteres")
    .max(100, "O sobrenome deve ter no máximo 100 caracteres"),
  username: z
    .string()
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
    .max(30, "O nome de usuário deve ter no máximo 30 caracteres"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(100),
  email: z.email(),
});

import { z } from "zod";

export type loginSchemaType = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.email("Email inválido").nonempty("Email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(100),
});

import z from "zod";

export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Sua senha atual deve ter pelo menos 6 caracteres")
    .max(100, "Sua senha atual deve ter no máximo 100 caracteres"),
  newPassword: z
    .string()
    .min(6, "Sua nova senha deve ter pelo menos 6 caracteres")
    .max(100, "Sua nova senha deve ter no máximo 100 caracteres"),
});

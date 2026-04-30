import z from "zod";

export type newPasswordForgotSchemaType = z.infer<
  typeof newPasswordForgotSchema
>;

export const newPasswordForgotSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .max(100),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

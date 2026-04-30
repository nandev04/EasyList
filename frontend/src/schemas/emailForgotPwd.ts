import z from "zod";

export type emailForgotPwdSchemaType = z.infer<typeof emailForgotPwdSchema>;

export const emailForgotPwdSchema = z.object({
  email: z.email("Email inválido"),
});

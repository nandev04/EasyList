import z from "zod";

export type verifyOtpForgotPwdSchemaType = z.infer<
  typeof verifyOtpForgotPwdSchema
>;

export const verifyOtpForgotPwdSchema = z.object({
  code: z.string().length(6, "O código deve ter exatamente 6 caracteres"),
  email: z.email(),
});

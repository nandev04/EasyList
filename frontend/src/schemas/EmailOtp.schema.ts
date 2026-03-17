import z from "zod";

export type emailOtpSchemaType = z.infer<typeof emailOtpSchema>;

export const emailOtpSchema = z.object({
  code: z
    .string()
    .toUpperCase()
    .regex(/^\d{6}$/, "Código deve conter exatamente 6 números"),
});

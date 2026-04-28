import z from "zod";

export type otpSchemaType = z.infer<typeof otpSchema>;

export const otpSchema = z.object({
  code: z
    .string()
    .toUpperCase()
    .regex(/^\d{6}$/, "Código deve conter exatamente 6 números"),
});

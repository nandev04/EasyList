import z from "zod";

export type emailVerifySchemaType = z.infer<typeof emailVerifySchema>;

export const emailVerifySchema = z.object({
  email: z.email("Email inválido"),
});

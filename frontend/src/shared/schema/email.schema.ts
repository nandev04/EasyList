import z from "zod";

export type emailValidateSchemaType = z.infer<typeof emailValidateSchema>;

export const emailValidateSchema = z.object({
  email: z.email("Email inválido"),
});

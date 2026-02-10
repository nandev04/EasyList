import z from "zod";

export type taskSchemaType = z.infer<typeof taskSchema>;

export const taskSchema = z.object({
  title: z.string().nonempty().trim().min(1),
  description: z.string().trim().optional(),
});

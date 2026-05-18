import z from "zod";

export type createTaskSchemaType = z.infer<typeof createTaskSchema>;
export type editTaskSchemaType = z.infer<typeof editTaskSchema>;

export const createTaskSchema = z.object({
  title: z
    .string()
    .nonempty("O título é obrigatório")
    .trim()
    .min(1, "O título deve ter pelo menos 1 caractere"),
  description: z
    .string()
    .trim()
    .nullish()
    .transform((v) => (v === "" ? null : v)),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
});

export const editTaskSchema = createTaskSchema.partial();

export const getTaskQuerySchema = z.object({
  limit: z.number().int().positive().max(50).optional(),
  cursor: z.number().int().positive().optional(),
  status: z.enum(["PENDING", "COMPLETED", "IN_PROGRESS"]).optional(),
});

export type GetTaskQueryParams = z.infer<typeof getTaskQuerySchema>;

import z from "zod";

export type taskSchemaType = z.infer<typeof taskSchema>;

export const taskSchema = z.object({
  title: z
    .string()
    .nonempty("O título é obrigatório")
    .trim()
    .min(1, "O título deve ter pelo menos 1 caractere"),
  description: z.string().trim().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
});

export const getTaskQuerySchema = z.object({
  limit: z.number().int().positive().max(50).optional(),
  cursor: z.number().int().positive().optional(),
  status: z.enum(["PENDING", "COMPLETED", "IN_PROGRESS"]).optional(),
});

export type GetTaskQueryParams = z.infer<typeof getTaskQuerySchema>;

import { z } from 'zod';

type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;
type deleteTaskSchemaParamsType = z.infer<typeof deleteTaskSchemaParams>;
type updateTaskSchemaBodyType = z.infer<typeof updateTaskSchemaBody>;
type updateTaskSchemaParamsType = z.infer<typeof updateTaskSchemaParams>;

const createTaskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().trim().min(1).optional().nullable(),
  status: z.enum(['PENDING', 'COMPLETED', 'IN_PROGRESS']).default('PENDING')
});

const deleteTaskSchemaParams = z.object({
  id: z.coerce.number().positive().int()
});

const updateTaskSchemaParams = z.object({
  id: z.coerce.number().positive().int()
});

const updateTaskSchemaBody = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().trim().min(1).nullable().optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'IN_PROGRESS']).optional()
});

export {
  createTaskSchema,
  CreateTaskSchemaType,
  deleteTaskSchemaParams,
  deleteTaskSchemaParamsType,
  updateTaskSchemaBody,
  updateTaskSchemaBodyType,
  updateTaskSchemaParams,
  updateTaskSchemaParamsType
};

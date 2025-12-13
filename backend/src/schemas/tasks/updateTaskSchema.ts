import { z } from 'zod';

type updateTaskSchemaBodyType = z.infer<typeof updateTaskSchemaBody>;
type updateTaskSchemaParamsType = z.infer<typeof updateTaskSchemaParams>;

const updateTaskSchemaParams = z.object({
  id: z.coerce.number().positive().int()
});

const updateTaskSchemaBody = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().trim().min(1).nullable().optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'IN_PROGRESS']).optional()
});

export {
  updateTaskSchemaBody,
  updateTaskSchemaBodyType,
  updateTaskSchemaParams,
  updateTaskSchemaParamsType
};

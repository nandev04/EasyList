import { z } from 'zod';

type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;

const createTaskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional()
});
export { createTaskSchema, CreateTaskSchemaType };

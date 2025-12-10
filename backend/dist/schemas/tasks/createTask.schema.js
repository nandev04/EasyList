import { z } from 'zod';
const createTaskSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().max(1000).optional()
});
export { createTaskSchema };

import { z } from 'zod';
const createTaskSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().trim().min(1).optional().nullable(),
    status: z.enum(['PENDING', 'COMPLETED', 'IN_PROGRESS']).default('PENDING')
});
export { createTaskSchema };

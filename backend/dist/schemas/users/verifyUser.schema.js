import { z } from 'zod';
const verifyUserQuerySchema = z.object({
    token: z.string().min(1, 'Token is required')
});
export { verifyUserQuerySchema };

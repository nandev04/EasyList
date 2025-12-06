import { z } from 'zod';
const verifyUserSchema = z.object({
    token: z.string().min(1, 'Token is required')
});
export default verifyUserSchema;

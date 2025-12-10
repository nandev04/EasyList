import { z } from 'zod';
const forgotPasswordSchema = z.object({
    email: z.email().min(1)
});
export default forgotPasswordSchema;

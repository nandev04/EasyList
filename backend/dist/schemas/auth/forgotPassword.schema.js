import { z } from 'zod';
const forgotPasswordBodySchema = z.object({
    email: z.email().min(1)
});
export { forgotPasswordBodySchema };

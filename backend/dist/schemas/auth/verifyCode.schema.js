import { z } from 'zod';
const verifyCodeBodySchema = z.object({
    code: z.string().min(1),
    email: z.email()
});
export { verifyCodeBodySchema };

import { z } from 'zod';
const resetPasswordBodySchema = z.object({
    newPassword: z.string().min(6).max(100),
    tokenResetPassword: z.uuid()
});
export { resetPasswordBodySchema };

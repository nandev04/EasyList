import { z } from 'zod';

type forgotPasswordBodyType = z.infer<typeof forgotPasswordBodySchema>;

const forgotPasswordBodySchema = z.object({
  email: z.email().min(1)
});

export { forgotPasswordBodySchema, forgotPasswordBodyType };

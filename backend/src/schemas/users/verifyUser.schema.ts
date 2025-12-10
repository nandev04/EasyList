import { z } from 'zod';

type VerifyUserQuerySchemaType = z.infer<typeof verifyUserQuerySchema>;

const verifyUserQuerySchema = z.object({
  token: z.string().min(1, 'Token is required')
});

export { verifyUserQuerySchema, VerifyUserQuerySchemaType };

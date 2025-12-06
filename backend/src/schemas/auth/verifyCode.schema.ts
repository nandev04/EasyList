import { z } from 'zod';

type VerifyCodeBodySchemaType = z.infer<typeof verifyCodeBodySchema>;

const verifyCodeBodySchema = z.object({
  code: z.string().min(1),
  email: z.email()
});

export { verifyCodeBodySchema, VerifyCodeBodySchemaType };

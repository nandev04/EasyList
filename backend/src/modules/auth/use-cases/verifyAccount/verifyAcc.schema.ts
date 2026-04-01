import z from 'zod';

type verifyAccountQuerySchemaType = z.infer<typeof verifyAccountQuerySchema>;

const verifyAccountQuerySchema = z.object({
  token: z.string().min(1, 'Token is required')
});

export { verifyAccountQuerySchema, verifyAccountQuerySchemaType };

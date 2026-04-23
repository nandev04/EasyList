import z from 'zod';

type verifyAccountQuerySchemaType = z.infer<typeof verifyAccountQuerySchema>;
type resendTokenBodyType = z.infer<typeof resendToken>;

const verifyAccountQuerySchema = z.object({
  token: z.string().min(1, 'Token is required')
});

const resendToken = z.object({
  email: z.email('Email inválido')
});

export { verifyAccountQuerySchema, verifyAccountQuerySchemaType, resendToken, resendTokenBodyType };

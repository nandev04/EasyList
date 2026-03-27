import z from 'zod';

type verifyOtpPwdBodySchemaType = z.infer<typeof verifyOtpPwdBodySchema>;
const verifyOtpPwdBodySchema = z.object({
  code: z.string().length(6, 'O código deve ter exatamente 6 caracteres'),
  email: z.email()
});

export { verifyOtpPwdBodySchema, verifyOtpPwdBodySchemaType };

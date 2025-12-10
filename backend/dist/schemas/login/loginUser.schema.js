import { z } from 'zod';
const loginUserSchema = z.object({
    email: z.email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').max(100)
});
export default loginUserSchema;

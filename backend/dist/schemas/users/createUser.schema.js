import { z } from 'zod';
const createUserSchema = z.object({
    username: z
        .string()
        .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres')
        .max(30, 'O nome de usuário deve ter no máximo 30 caracteres'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').max(100),
    email: z.email()
});
export default createUserSchema;

import { z } from 'zod';
const verifyCodeSchema = z.object({
    code: z.string().min(1), // obrigatório e não vazio
    email: z.email() // obrigatório e formato de email válido
});
export default verifyCodeSchema;

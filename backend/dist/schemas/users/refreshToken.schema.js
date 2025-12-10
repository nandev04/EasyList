import { z } from 'zod';
const refreshSchema = z.object({
    refreshToken: z.string().min(1) // obrigatório e não vazio
});
export default refreshSchema;

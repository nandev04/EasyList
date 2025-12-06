import { z } from 'zod';
const refreshSchemaUser = z.object({
    refreshToken: z.string().min(1) // obrigatório e não vazio
});
export default refreshSchemaUser;

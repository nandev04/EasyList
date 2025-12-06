import { number, z } from 'zod';
const deleteUserSchema = z.object({
    id: number().min(1, 'ID inválido')
});
export default deleteUserSchema;

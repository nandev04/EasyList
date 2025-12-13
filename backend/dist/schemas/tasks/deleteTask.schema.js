import { z } from 'zod';
const deleteTaskSchemaParams = z.object({
    id: z.coerce.number().positive().int()
});
export { deleteTaskSchemaParams };

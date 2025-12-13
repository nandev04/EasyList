import { z } from 'zod';

type deleteTaskSchemaParamsType = z.infer<typeof deleteTaskSchemaParams>;

const deleteTaskSchemaParams = z.object({
  id: z.coerce.number().positive().int()
});

export { deleteTaskSchemaParams, deleteTaskSchemaParamsType };

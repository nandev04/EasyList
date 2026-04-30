import { createTaskSchemaType } from './task.schema.js';

type createTaskInputType = createTaskSchemaType & { userId: string };

export { createTaskInputType };

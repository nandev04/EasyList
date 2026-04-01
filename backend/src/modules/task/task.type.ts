import { CreateTaskSchemaType } from './task.schema.js';

type createTaskInputType = CreateTaskSchemaType & { userId: string };

export { createTaskInputType };

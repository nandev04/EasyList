import { CreateTaskSchemaType } from './task.schema.js';

type createTaskInputType = CreateTaskSchemaType & { userId: number };

export { createTaskInputType };

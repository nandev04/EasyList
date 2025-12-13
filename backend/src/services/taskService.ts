import * as Model from '../models/taskModel.js';
import { CreateTaskSchemaType } from '../schemas/tasks/createTask.schema.js';
import { updateTaskSchemaBodyType } from '../schemas/tasks/updateTaskSchema.js';

// // const getTasks = async ({ id }: TaskType) => {
//   return await tasksModel.getTasks(id);
// };

type createTaskInputType = CreateTaskSchemaType & { userId: number };
const createTask = async ({ userId, title, status, description }: createTaskInputType) => {
  return await Model.createTask({ userId, title, description, status });
};

const updateTask = async (taskId: number, userId: number, data: updateTaskSchemaBodyType) => {
  return await Model.updateTask(taskId, userId, data);
};

const removeTask = async (id: string) => {
  // return await tasksModel.removeTask(+id);
};

export { createTask, removeTask, updateTask, createTaskInputType };

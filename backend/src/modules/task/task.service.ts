import * as Model from '../models/taskModel.js';
import { CreateTaskSchemaType } from '../schemas/tasks/createTask.schema.js';
import { updateTaskSchemaBodyType } from '../schemas/tasks/updateTask.schema.js';

const getTasks = async (userId: number) => {
  return await Model.getTasks(userId);
};

type createTaskInputType = CreateTaskSchemaType & { userId: number };
const createTask = async ({ userId, title, status, description }: createTaskInputType) => {
  return await Model.createTask({ userId, title, description, status });
};

const updateTask = async (taskId: number, userId: number, data: updateTaskSchemaBodyType) => {
  return await Model.updateTask(taskId, userId, data);
};

const removeTask = async (taskId: number, userId: number) => {
  return await Model.removeTask(taskId, userId);
};

export { getTasks, createTask, removeTask, updateTask, createTaskInputType };

import * as Model from '../task/task.model.js';
import { updateTaskSchemaBodyType } from '../task/task.schema.js';
import { createTaskInputType } from './task.type.js';

const getTasks = async (userId: number) => {
  return await Model.getTasks(userId);
};

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

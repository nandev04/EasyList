import * as Repository_Task from './task.repository.js';
import { updateTaskSchemaBodyType } from '../task/task.schema.js';
import { createTaskInputType } from './task.type.js';

const getTasks = async (userId: number) => {
  return await Repository_Task.getTasks(userId);
};

const createTask = async ({ userId, title, status, description }: createTaskInputType) => {
  return await Repository_Task.createTask({ userId, title, description, status });
};

const updateTask = async (taskId: number, userId: number, data: updateTaskSchemaBodyType) => {
  return await Repository_Task.updateTask(taskId, userId, data);
};

const removeTask = async (taskId: number, userId: number) => {
  return await Repository_Task.removeTask(taskId, userId);
};

export { getTasks, createTask, removeTask, updateTask, createTaskInputType };

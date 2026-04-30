import * as Repository_Task from './task.repository.js';
import { updateTaskSchemaBodyType } from '../task/task.schema.js';
import { createTaskInputType } from './task.type.js';

const getTasks = async (userId: string, limit: number, cursorId?: number) => {
  const returnedTasks = await Repository_Task.getTasks(userId, limit, cursorId);
  const hasNextPage = returnedTasks.length > limit;
  const data = hasNextPage ? returnedTasks.slice(0, limit) : returnedTasks;

  return {
    data: data,
    pagination: {
      nextCursor: hasNextPage ? data[data.length - 1].id : null,
      hasNextPage: hasNextPage
    }
  };
};

const createTask = async ({ userId, title, status, description }: createTaskInputType) => {
  return await Repository_Task.createTask({ userId, title, description, status });
};

const updateTask = async (taskId: number, userId: string, data: updateTaskSchemaBodyType) => {
  return await Repository_Task.updateTask(taskId, userId, data);
};

const removeTask = async (taskId: number, userId: string) => {
  return await Repository_Task.removeTask(taskId, userId);
};

export { getTasks, createTask, removeTask, updateTask, createTaskInputType };

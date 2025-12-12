import jwt from 'jsonwebtoken';
import * as Model from '../models/taskModel.js';
import { CreateTaskType } from '../typesAndInterfaces/tasks.js';
import { AuthService } from './authService.js';
import { CreateTaskSchemaType } from '../schemas/tasks/createTask.schema.js';

// // const getTasks = async ({ id }: TaskType) => {
//   return await tasksModel.getTasks(id);
// };

type createTaskInputType = CreateTaskSchemaType & { userId: number };
const createTask = async ({ userId, title, status, description }: createTaskInputType) => {
  console.log(status);
  return await Model.createTask({ userId, title, description, status });
};

// const editTask = async ({ title, description, status, id }: TaskType) => {
//   return await tasksModel.editTask({ title, description, status, id: +id });
// };

const removeTask = async (id: string) => {
  // return await tasksModel.removeTask(+id);
};

export { createTask, removeTask, createTaskInputType };

import jwt from 'jsonwebtoken';
import * as tasksModel from '../models/taskModel.js';
import { TaskType } from '../typesAndInterfaces/tasks.js';
import { AuthService } from './authService.js';

// // const getTasks = async ({ id }: TaskType) => {
//   return await tasksModel.getTasks(id);
// };

const createTask = async ({ accessToken, title, description, date }: TaskType) => {};

// const editTask = async ({ title, description, status, id }: TaskType) => {
//   return await tasksModel.editTask({ title, description, status, id: +id });
// };

const removeTask = async (id: string) => {
  return await tasksModel.removeTask(+id);
};

export { createTask, removeTask };

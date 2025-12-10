import * as tasksModel from '../models/taskModel.js';
import { TaskType } from '../typesAndInterfaces/tasks.js';

const getTasks = async ({ id }: TaskType) => {
  return await tasksModel.getTasks(id);
};

const createTask = async ({ id, title, description, date }: TaskType) => {
  const dateUTC = date ?? new Date(Date.now()).toUTCString();
  return await tasksModel.createTask({ id: +id, title, description, dateUTC });
};

const editTask = async ({ title, description, status, id }: TaskType) => {
  return await tasksModel.editTask({ title, description, status, id: +id });
};

const removeTask = async (id: string) => {
  return await tasksModel.removeTask(+id);
};

export { getTasks, createTask, editTask, removeTask };

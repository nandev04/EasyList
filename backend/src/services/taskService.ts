import * as tasksModel from '../models/taskModel.js';
import { TaskType } from '../types/tasks.js';

const getTasks = async ({ id }: TaskType) => {
  try {
    return await tasksModel.getTasks(id);
  } catch (err: unknown) {
    throw err;
  }
};

const createTask = async ({ id, title, description, date }: TaskType) => {
  try {
    const dateUTC = date ?? new Date(Date.now()).toUTCString();
    return await tasksModel.createTask({ id: +id, title, description, dateUTC });
  } catch (err) {
    throw err;
  }
};

const editTask = async ({ title, description, status, id }: TaskType) => {
  try {
    return await tasksModel.editTask({ title, description, status, id: +id });
  } catch (err) {
    throw err;
  }
};

const removeTask = async (id: string) => {
  try {
    return await tasksModel.removeTask(+id);
  } catch (err) {
    throw err;
  }
};

export { getTasks, createTask, editTask, removeTask };

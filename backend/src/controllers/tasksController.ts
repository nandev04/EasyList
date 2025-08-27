import { getTasks, createTask, editTask, removeTask } from '../models/taskModel';
import { Request, Response } from 'express';

const getTasksController = async (req: Request, res: Response) => {
  const tasks = await getTasks(req.body);
  res.status(200).json(tasks);
};

const createTaskController = async (req: Request, res: Response) => {
  const createdTask = await createTask(req.body);
  res.status(201).json(createdTask);
};

const editTaskController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await editTask(req.body, id);

  return res.status(204).json();
};

const removeTaskController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await removeTask(id);

  return res.status(204).json();
};

export { getTasksController, createTaskController, editTaskController, removeTaskController };

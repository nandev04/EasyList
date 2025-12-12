import * as taskService from '../services/taskService.js';
import { NextFunction, Request, Response } from 'express';
import { CreateTaskSchemaType } from '../schemas/tasks/createTask.schema.js';

const getTasks = async (req: Request, res: Response, next: NextFunction) => {};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;

    const { title, description, status } = req.validated!.body as CreateTaskSchemaType;
    const createdTask = await taskService.createTask({ title, description, status, userId });
    res.status(201).json(createdTask);
  } catch (err) {
    next(err);
  }
};

const editTask = async (req: Request, res: Response, next: NextFunction) => {};

const removeTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await taskService.removeTask(id);

    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

export { getTasks, createTask, editTask, removeTask };

import * as Service from './task.service.js';
import { NextFunction, Request, Response } from 'express';
import {
  CreateTaskSchemaType,
  updateTaskSchemaBodyType,
  updateTaskSchemaParamsType,
  deleteTaskSchemaParamsType
} from './task.schema.js';

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const tasks = await Service.getTasks(userId);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;

    const { title, description, status } = req.validated!.body as CreateTaskSchemaType;
    const createdTask = await Service.createTask({ title, description, status, userId });
    res.status(204).json(createdTask);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const { id } = req.validated!.params as updateTaskSchemaParamsType;
    const data = req.validated!.body as updateTaskSchemaBodyType;

    const updatedTask = await Service.updateTask(id, userId, data);

    return res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

const removeTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.validated!.params as deleteTaskSchemaParamsType;
    const userId = req.userId!;
    await Service.removeTask(id, userId);

    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

export { getTasks, createTask, updateTask, removeTask };

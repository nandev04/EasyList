import * as taskService from '../services/taskService.js';
import { NextFunction, Request, Response } from 'express';
import { CreateTaskSchemaType } from '../schemas/tasks/createTask.schema.js';
import {
  updateTaskSchemaBodyType,
  updateTaskSchemaParamsType
} from '../schemas/tasks/updateTask.schema.js';
import { deleteTaskSchemaParamsType } from '../schemas/tasks/deleteTask.schema.js';

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

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const { id } = req.validated!.params as updateTaskSchemaParamsType;
    const data = req.validated!.body as updateTaskSchemaBodyType;

    const updatedTask = await taskService.updateTask(id, userId, data);

    return res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

const removeTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.validated!.params as deleteTaskSchemaParamsType;
    const userId = req.userId!;
    await taskService.removeTask(id, userId);

    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

export { getTasks, createTask, updateTask, removeTask };

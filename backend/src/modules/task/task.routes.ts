import express from 'express';
import * as taskController from './task.controller.js';
import validate from '../../shared/middlewares/validateData.js';
import {
  createTaskSchema,
  updateTaskSchemaBody,
  deleteTaskSchemaParams,
  getTaskSchema
} from './task.schema.js';
import requireAuth from '../../shared/middlewares/requireAuth.js';
import * as Rate_Limit from './middlewares/rateLimit.js';
import { authenticate } from '../../shared/middlewares/authenticate.js';

const taskRoutes = express.Router();

taskRoutes.get(
  '/tasks',
  Rate_Limit.getTasks,
  authenticate,
  requireAuth,
  validate({ query: getTaskSchema }),
  taskController.getTasks
);
taskRoutes.post(
  '/tasks',
  Rate_Limit.createtask,
  authenticate,
  requireAuth,
  validate({ body: createTaskSchema }),
  taskController.createTask
);
taskRoutes.patch(
  '/tasks/:id',
  Rate_Limit.editTask,
  authenticate,
  requireAuth,
  validate({ body: updateTaskSchemaBody, params: deleteTaskSchemaParams }),
  taskController.updateTask
);
taskRoutes.delete(
  '/tasks/:id',
  Rate_Limit.deleteTask,
  authenticate,
  requireAuth,
  validate({ params: deleteTaskSchemaParams }),
  taskController.removeTask
);

export default taskRoutes;

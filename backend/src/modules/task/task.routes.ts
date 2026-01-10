import express from 'express';
import * as taskController from './task.controller.js';
import validate from '../../middlewares/validateData.js';
import { createTaskSchema, updateTaskSchemaBody, deleteTaskSchemaParams } from './task.schema.js';
import requireAuth from '../../middlewares/requireAuth.js';
import * as Rate_Limit from '../../middlewares/rateLimit.js';
import { authenticate } from '../../middlewares/authenticate.js';

const taskRoutes = express.Router();

taskRoutes.get('/tasks', Rate_Limit.getTasks, authenticate, requireAuth, taskController.getTasks);
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

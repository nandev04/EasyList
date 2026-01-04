import express from 'express';
import * as taskController from './task.controller.js';
import validate from '../../middlewares/validateData.js';
import { createTaskSchema, updateTaskSchemaBody, deleteTaskSchemaParams } from './task.schema.js';
import { validateJwt } from '../../middlewares/validateJwt.js';
import * as Rate_Limit from '../../middlewares/rateLimit.js';

const taskRoutes = express.Router();

taskRoutes.get('/tasks', Rate_Limit.getTasks, validateJwt, taskController.getTasks);
taskRoutes.post(
  '/tasks',
  Rate_Limit.createtask,
  validateJwt,
  validate({ body: createTaskSchema }),
  taskController.createTask
);
taskRoutes.patch(
  '/tasks/:id',
  Rate_Limit.editTask,
  validateJwt,
  validate({ body: updateTaskSchemaBody, params: deleteTaskSchemaParams }),
  taskController.updateTask
);
taskRoutes.delete(
  '/tasks/:id',
  Rate_Limit.deleteTask,
  validateJwt,
  validate({ params: deleteTaskSchemaParams }),
  taskController.removeTask
);

export default taskRoutes;

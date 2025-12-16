import express from 'express';
import * as taskController from './task.controller.js';
import validate from '../../middlewares/validateData.js';
import { validateJwt } from '../../middlewares/validateJwt.js';
import { createTaskSchema, updateTaskSchemaBody, deleteTaskSchemaParams } from './task.schema.js';

const taskRoutes = express.Router();

taskRoutes.get('/tasks', validateJwt, taskController.getTasks);
taskRoutes.post(
  '/tasks',
  validateJwt,
  validate({ body: createTaskSchema }),
  taskController.createTask
);
taskRoutes.patch(
  '/tasks/:id',
  validateJwt,
  validate({ body: updateTaskSchemaBody, params: deleteTaskSchemaParams }),
  taskController.updateTask
);
taskRoutes.delete(
  '/tasks/:id',
  validateJwt,
  validate({ params: deleteTaskSchemaParams }),
  taskController.removeTask
);

export default taskRoutes;

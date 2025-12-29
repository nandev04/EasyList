import express from 'express';
import * as taskController from './task.controller.js';
import validate from '../../middlewares/validateData.js';
import { createTaskSchema, updateTaskSchemaBody, deleteTaskSchemaParams } from './task.schema.js';

const taskRoutes = express.Router();

taskRoutes.get('/tasks', taskController.getTasks);
taskRoutes.post('/tasks', validate({ body: createTaskSchema }), taskController.createTask);
taskRoutes.patch(
  '/tasks/:id',
  validate({ body: updateTaskSchemaBody, params: deleteTaskSchemaParams }),
  taskController.updateTask
);
taskRoutes.delete(
  '/tasks/:id',
  validate({ params: deleteTaskSchemaParams }),
  taskController.removeTask
);

export default taskRoutes;

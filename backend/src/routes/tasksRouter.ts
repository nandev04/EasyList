import express from 'express';
import * as taskController from '../controllers/tasksController.js';
import validate from '../middlewares/validateData.js';
import { createTaskSchema } from '../schemas/tasks/createTask.schema.js';
import { validateJwt } from '../middlewares/validateJwt.js';
import { updateTaskSchemaBody } from '../schemas/tasks/updateTask.schema.js';
import { deleteTaskSchemaParams } from '../schemas/tasks/deleteTask.schema.js';

const router = express.Router();

router.get('/tasks', taskController.getTasks);
router.post('/tasks', validateJwt, validate({ body: createTaskSchema }), taskController.createTask);
router.put(
  '/tasks/:id',
  validateJwt,
  validate({ body: updateTaskSchemaBody, params: deleteTaskSchemaParams }),
  taskController.updateTask
);
router.delete(
  '/tasks/:id',
  validateJwt,
  validate({ params: deleteTaskSchemaParams }),
  taskController.removeTask
);

export default router;

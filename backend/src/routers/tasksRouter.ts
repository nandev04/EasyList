import express from 'express';
import validateTaskStatus from '../middlewares/validarTaskStatus';
import validarTasks from '../middlewares/validarTask';
import {
  getTasksController,
  createTaskController,
  editTaskController,
  removeTaskController,
} from '../controllers/tasksController';

const router = express.Router();

router.get('/tasks', getTasksController);
router.post('/tasks', validarTasks, createTaskController);
router.put('/tasks/:id', validateTaskStatus, editTaskController);
router.delete('/tasks/:id', removeTaskController);

export default router;

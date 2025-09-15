import express from 'express';
import validateTaskStatus from '../middlewares/validarTaskStatus.js';
import validarTasks from '../middlewares/validarTask.js';
import * as taskController from '../controllers/tasksController.js';

const router = express.Router();

router.get('/tasks', taskController.getTasks);
router.post('/tasks', validarTasks, taskController.createTask);
router.put('/tasks/:id', validateTaskStatus, taskController.editTask);
router.delete('/tasks/:id', taskController.removeTask);

export default router;

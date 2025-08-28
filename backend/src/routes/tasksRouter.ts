import express from 'express';
import validateTaskStatus from '../middlewares/validarTaskStatus';
import validarTasks from '../middlewares/validarTask';
import * as taskController from '../controllers/tasksController';

const router = express.Router();

router.get('/tasks', taskController.getTasks);
router.post('/tasks', validarTasks, taskController.createTask);
router.put('/tasks/:id', validateTaskStatus, taskController.editTask);
router.delete('/tasks/:id', taskController.removeTask);

export default router;

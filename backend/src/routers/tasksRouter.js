const express = require('express');
const {
  getAllController,
  createTaskController,
  editTaskController,
  removeTaskController,
} = require('../controllers/tasksController');
const { validarTasks } = require('../middlewares/validarTask');

const router = express.Router();

router.get('/tasks', getAllController);
router.post('/tasks', validarTasks, createTaskController);
router.put('/tasks/:id', editTaskController);
router.delete('/tasks/:id', removeTaskController);

module.exports = router;

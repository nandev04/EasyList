const { getAll, createTask, editTask, removeTask } = require('../models/taskModel');

const getAllController = async (_req, res) => {
  const tasks = await getAll();
  res.status(200).json(tasks);
};

const createTaskController = async (req, res) => {
  const createdTask = await createTask(req.body);
  res.status(201).json(createdTask);
};

const editTaskController = async (req, res) => {
  const { id } = req.params;
  await editTask(req.body, id);

  return res.status(204).json();
};

const removeTaskController = async (req, res) => {
  const { id } = req.params;
  await removeTask(id);

  return res.status(204).json();
};

module.exports = {
  getAllController,
  createTaskController,
  editTaskController,
  removeTaskController,
};

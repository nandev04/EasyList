import * as taskService from '../services/taskService.js';
const getTasks = async (req, res) => {
    const { id } = req.body;
    const tasks = await taskService.getTasks(id);
    res.status(200).json(tasks);
};
const createTask = async (req, res) => {
    const { id, title, description } = req.body;
    const createdTask = await taskService.createTask({ id, title, description });
    res.status(201).json(createdTask);
};
const editTask = async (req, res) => {
    const { title, description, status } = req.body;
    const { id } = req.params;
    await taskService.editTask({ title, description, status, id });
    return res.status(204).json();
};
const removeTask = async (req, res) => {
    const { id } = req.params;
    await taskService.removeTask(id);
    return res.status(204).json();
};
export { getTasks, createTask, editTask, removeTask };

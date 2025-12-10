import * as taskService from '../services/taskService.js';
const getTasks = async (req, res, next) => {
    try {
        const { id } = req.body;
        const tasks = await taskService.getTasks(id);
        res.status(200).json(tasks);
    }
    catch (err) {
        next(err);
    }
};
const createTask = async (req, res, next) => {
    try {
        const { id, title, description } = req.body;
        const createdTask = await taskService.createTask({ id, title, description });
        res.status(201).json(createdTask);
    }
    catch (err) {
        next(err);
    }
};
const editTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;
        const { id } = req.params;
        await taskService.editTask({ title, description, status, id });
        return res.status(204).json();
    }
    catch (err) {
        next(err);
    }
};
const removeTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        await taskService.removeTask(id);
        return res.status(204).json();
    }
    catch (err) {
        next(err);
    }
};
export { getTasks, createTask, editTask, removeTask };

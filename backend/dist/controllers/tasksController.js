import * as Service from '../services/taskService.js';
const getTasks = async (req, res, next) => {
    try {
        const userId = req.userId;
        const tasks = await Service.getTasks(userId);
        res.status(200).json(tasks);
    }
    catch (err) {
        next(err);
    }
};
const createTask = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { title, description, status } = req.validated.body;
        const createdTask = await Service.createTask({ title, description, status, userId });
        res.status(201).json(createdTask);
    }
    catch (err) {
        next(err);
    }
};
const updateTask = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { id } = req.validated.params;
        const data = req.validated.body;
        const updatedTask = await Service.updateTask(id, userId, data);
        return res.status(200).json(updatedTask);
    }
    catch (err) {
        next(err);
    }
};
const removeTask = async (req, res, next) => {
    try {
        const { id } = req.validated.params;
        const userId = req.userId;
        await Service.removeTask(id, userId);
        return res.status(204).json();
    }
    catch (err) {
        next(err);
    }
};
export { getTasks, createTask, updateTask, removeTask };

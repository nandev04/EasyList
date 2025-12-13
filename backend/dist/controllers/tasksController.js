import * as taskService from '../services/taskService.js';
const getTasks = async (req, res, next) => { };
const createTask = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { title, description, status } = req.validated.body;
        const createdTask = await taskService.createTask({ title, description, status, userId });
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
        const updatedTask = await taskService.updateTask(id, userId, data);
        return res.status(200).json(updatedTask);
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
export { getTasks, createTask, updateTask, removeTask };

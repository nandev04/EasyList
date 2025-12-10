import { AppError } from '../utils/error.js';
import * as taskService from '../services/taskService.js';
const getTasks = async (req, res, next) => { };
const createTask = async (req, res, next) => {
    try {
        const { accessToken } = req.signedCookies;
        if (!accessToken)
            throw next(new AppError('Unauthorized', 401));
        const { title, description } = req.validated.body;
        // const createdTask = await taskService.createTask({ title, description });
        // res.status(201).json(createdTask);
    }
    catch (err) {
        next(err);
    }
};
const editTask = async (req, res, next) => { };
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

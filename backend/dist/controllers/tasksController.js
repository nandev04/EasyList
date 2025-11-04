import { AppError } from '../utils/error.js';
import * as taskService from '../services/taskService.js';
const getTasks = async (req, res) => {
    try {
        const { id } = req.body;
        const tasks = await taskService.getTasks(id);
        res.status(200).json(tasks);
    }
    catch (err) {
        if (err instanceof AppError)
            return res.status(err.statusCode).json({ message: err.message });
        return res.status(500).json({ message: 'Erro desconhecido' });
    }
};
const createTask = async (req, res) => {
    try {
        const { id, title, description } = req.body;
        const createdTask = await taskService.createTask({ id, title, description });
        res.status(201).json(createdTask);
    }
    catch (err) {
        if (err instanceof AppError)
            return res.status(err.statusCode).json({ message: err.message });
        return res.status(500).json({ message: 'Erro desconhecido' });
    }
};
const editTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const { id } = req.params;
        await taskService.editTask({ title, description, status, id });
        return res.status(204).json();
    }
    catch (err) {
        if (err instanceof AppError)
            return res.status(err.statusCode).json({ message: err.message });
        return res.status(500).json({ message: 'Erro desconhecido' });
    }
};
const removeTask = async (req, res) => {
    try {
        const { id } = req.params;
        await taskService.removeTask(id);
        return res.status(204).json();
    }
    catch (err) {
        if (err instanceof AppError)
            return res.status(err.statusCode).json({ message: err.message });
        return res.status(500).json({ message: 'Erro desconhecido' });
    }
};
export { getTasks, createTask, editTask, removeTask };

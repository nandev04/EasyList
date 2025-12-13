import * as Model from '../models/taskModel.js';
const createTask = async ({ userId, title, status, description }) => {
    return await Model.createTask({ userId, title, description, status });
};
const updateTask = async (taskId, userId, data) => {
    return await Model.updateTask(taskId, userId, data);
};
const removeTask = async (taskId, userId) => {
    return await Model.removeTask(taskId, userId);
};
export { createTask, removeTask, updateTask };

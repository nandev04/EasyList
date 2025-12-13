import * as Model from '../models/taskModel.js';
const createTask = async ({ userId, title, status, description }) => {
    return await Model.createTask({ userId, title, description, status });
};
const updateTask = async (taskId, userId, data) => {
    return await Model.updateTask(taskId, userId, data);
};
const removeTask = async (id) => {
    // return await tasksModel.removeTask(+id);
};
export { createTask, removeTask, updateTask };

import * as Model from '../models/taskModel.js';
const createTask = async ({ userId, title, status, description }) => {
    console.log(status);
    return await Model.createTask({ userId, title, description, status });
};
// const editTask = async ({ title, description, status, id }: TaskType) => {
//   return await tasksModel.editTask({ title, description, status, id: +id });
// };
const removeTask = async (id) => {
    // return await tasksModel.removeTask(+id);
};
export { createTask, removeTask };

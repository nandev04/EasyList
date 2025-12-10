import * as tasksModel from '../models/taskModel.js';
// // const getTasks = async ({ id }: TaskType) => {
//   return await tasksModel.getTasks(id);
// };
const createTask = async ({ accessToken, title, description, date }) => { };
// const editTask = async ({ title, description, status, id }: TaskType) => {
//   return await tasksModel.editTask({ title, description, status, id: +id });
// };
const removeTask = async (id) => {
    return await tasksModel.removeTask(+id);
};
export { createTask, removeTask };

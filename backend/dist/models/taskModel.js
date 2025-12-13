import prisma from '../lib/prisma.js';
const getTasks = async (userId) => {
    const tasks = await prisma.task.findMany({
        where: { userId },
        select: { title: true, description: true, status: true }
    });
    return tasks;
};
const createTask = async ({ userId, title, description, status }) => {
    const createdTask = await prisma.task.create({
        data: {
            title,
            description,
            status: status,
            user: {
                connect: { id: userId }
            }
        },
        include: {
            user: true
        }
    });
    return {
        insertId: createdTask.user.id,
        username: createdTask.user.name,
        title: createdTask.title,
        description: createdTask.description,
        status: createdTask.status
    };
};
const updateTask = async (id, userId, data) => {
    const editedtask = await prisma.task.update({
        where: { id, userId },
        data: { ...data },
        select: { id: true, title: true, description: true, status: true }
    });
    return editedtask;
};
const removeTask = async (taskId, userId) => {
    const removedTask = await prisma.task.delete({
        where: { id: taskId, userId }
    });
    return removedTask;
};
export { getTasks, updateTask, createTask, removeTask };

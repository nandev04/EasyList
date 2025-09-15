import prisma from '../lib/prisma.js';
import { taskStatus } from '../types/tasks.js';
const getTasks = async (id) => {
    const tasks = await prisma.task.findUnique({
        where: {
            id: +id,
        },
    });
    return tasks;
};
const createTask = async ({ id, title, description, dateUTC }) => {
    const createdTask = await prisma.task.create({
        data: {
            title,
            description,
            status: taskStatus.PENDING,
            created_at: dateUTC,
            user: {
                connect: { id: +id },
            },
        },
        include: {
            user: true,
        },
    });
    return { insertId: createdTask.user, username: createdTask.user.name };
};
const editTask = async ({ title, description, status, id }) => {
    const editedtask = await prisma.task.update({
        where: { id: id },
        data: {
            title,
            description,
            status,
        },
    });
    return editedtask;
};
const removeTask = async (id) => {
    const removedTask = await prisma.task.delete({
        where: { id: id },
    });
    return removedTask;
};
export { getTasks, editTask, createTask, removeTask };

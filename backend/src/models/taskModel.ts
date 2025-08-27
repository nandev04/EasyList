import prisma from '../lib/prisma';
import { createTaskType, editTaskType } from '../types/tasksInterface';

const getTasks = async (id: string) => {
  const tasks = await prisma.task.findUnique({
    where: {
      id: +id,
    },
  });
  return tasks;
};

const createTask = async (id: string, body: createTaskType) => {
  const { title, description } = body;

  const dateUTC = new Date(Date.now()).toUTCString();

  const createdTask = await prisma.task.create({
    data: {
      title,
      description,
      status: 'pendente',
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

const editTask = async (tasks: editTaskType, id: string) => {
  const { title, description, status } = tasks;

  const editedtask = await prisma.task.update({
    where: { id: +id },
    data: {
      title,
      description,
      status,
    },
  });
  return editedtask;
};

const removeTask = async (id: string) => {
  const removedTask = await prisma.task.delete({
    where: { id: +id },
  });
  return removedTask;
};

export { getTasks, editTask, createTask, removeTask };

import { AppError } from '../utils/error.js';
import prisma from '../lib/prisma.js';
import { CreateTaskType, taskStatus } from '../typesAndInterfaces/tasks.js';
import { createTaskInputType } from '../services/taskService.js';

const getTasks = async (id: string) => {
  const tasks = await prisma.task.findUnique({
    where: {
      id: +id
    }
  });
  if (!tasks) throw new AppError('Tasks não encontrada', 404);
  return tasks;
};

const createTask = async ({ userId, title, description, status }: createTaskInputType) => {
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

type TaskModelEdit = Omit<CreateTaskType, 'userId'> & { id: number };
const editTask = async ({ title, description, status, id }: TaskModelEdit) => {
  const editedtask = await prisma.task.update({
    where: { id: id },
    data: {
      title,
      description,
      status
    }
  });
  return editedtask;
};

const removeTask = async (id: number) => {
  const removedTask = await prisma.task.delete({
    where: { id: id }
  });
  return removedTask;
};

export { getTasks, editTask, createTask, removeTask };

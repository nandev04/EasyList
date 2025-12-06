import { AppError } from '../utils/error.js';
import prisma from '../lib/prisma.js';
import { TaskModelInput, TaskType, taskStatus } from '../typesAndInterfaces/tasks.js';

const getTasks = async (id: string) => {
  const tasks = await prisma.task.findUnique({
    where: {
      id: +id
    }
  });
  if (!tasks) throw new AppError('Tasks não encontrada', 404);
  return tasks;
};

const createTask = async ({ id, title, description, dateUTC }: TaskModelInput) => {
  const createdTask = await prisma.task.create({
    data: {
      title,
      description,
      status: taskStatus.PENDING,
      created_at: dateUTC,
      user: {
        connect: { id: +id }
      }
    },
    include: {
      user: true
    }
  });

  return { insertId: createdTask.user, username: createdTask.user.name };
};

type TaskModelEdit = Omit<TaskType, 'id'> & { id: number };
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

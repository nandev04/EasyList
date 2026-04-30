import prisma from '../../infra/database/prismaClient.js';
import { createTaskInputType } from '../task/task.type.js';
import { updateTaskSchemaBodyType } from '../task/task.schema.js';

const getTasks = async (userId: string, limit: number, cursorId?: number) => {
  const tasks = await prisma.task.findMany({
    where: { userId },
    take: limit + 1,
    ...(cursorId && {
      skip: 1,
      cursor: { id: cursorId }
    }),
    orderBy: [{ id: 'desc' }],
    select: {
      title: true,
      description: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      id: true
    }
  });
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
    }
  });

  return {
    title: createdTask.title,
    description: createdTask.description,
    status: createdTask.status
  };
};

const updateTask = async (id: number, userId: string, data: updateTaskSchemaBodyType) => {
  const editedtask = await prisma.task.update({
    where: { id, userId },
    data: { ...data },
    select: { id: true, title: true, description: true, status: true }
  });
  return editedtask;
};

const removeTask = async (taskId: number, userId: string) => {
  const removedTask = await prisma.task.delete({
    where: { id: taskId, userId }
  });
  return removedTask;
};

export { getTasks, updateTask, createTask, removeTask };

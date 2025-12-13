import { AppError } from '../utils/error.js';
import prisma from '../lib/prisma.js';
import { CreateTaskType } from '../typesAndInterfaces/tasks.js';
import { createTaskInputType } from '../services/taskService.js';
import { updateTaskSchemaBodyType } from '../schemas/tasks/updateTaskSchema.js';

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

const updateTask = async (id: number, userId: number, data: updateTaskSchemaBodyType) => {
  const editedtask = await prisma.task.update({
    where: { id, userId },
    data: { ...data },
    select: { id: true, title: true, description: true, status: true }
  });
  return editedtask;
};

const removeTask = async (taskId: number, userId: number) => {
  const removedTask = await prisma.task.delete({
    where: { id: taskId, userId }
  });
  return removedTask;
};

export { getTasks, updateTask, createTask, removeTask };

import { AppError } from '../utils/error.js';
import prisma from '../lib/prisma.js';
import { TaskModelInput, TaskType, taskStatus } from '../types/tasks.js';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError
} from '@prisma/client/runtime/library.js';

const getTasks = async (id: string) => {
  try {
    const tasks = await prisma.task.findUnique({
      where: {
        id: +id
      }
    });
    if (!tasks) throw new AppError('Tasks não encontrada', 404);
    return tasks;
  } catch (error) {
    throw new AppError(error instanceof Error ? error.message : 'Erro desconhecido', 500);
  }
};

const createTask = async ({ id, title, description, dateUTC }: TaskModelInput) => {
  try {
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
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) throw new AppError(error.message, 400);
    if (
      error instanceof PrismaClientUnknownRequestError ||
      error instanceof PrismaClientRustPanicError ||
      error instanceof PrismaClientInitializationError ||
      error instanceof Error
    )
      throw new AppError(error.message, 500);
    throw new AppError('Erro desconhecido', 500);
  }
};

type TaskModelEdit = Omit<TaskType, 'id'> & { id: number };
const editTask = async ({ title, description, status, id }: TaskModelEdit) => {
  try {
    const editedtask = await prisma.task.update({
      where: { id: id },
      data: {
        title,
        description,
        status
      }
    });
    return editedtask;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) throw new AppError(error.message, 400);
    if (
      error instanceof PrismaClientUnknownRequestError ||
      error instanceof PrismaClientRustPanicError ||
      error instanceof PrismaClientInitializationError ||
      error instanceof Error
    )
      throw new AppError(error.message, 500);
    throw new AppError('Erro desconhecido', 500);
  }
};

const removeTask = async (id: number) => {
  try {
    const removedTask = await prisma.task.delete({
      where: { id: id }
    });
    return removedTask;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) throw new AppError(error.message, 400);
    if (
      error instanceof PrismaClientUnknownRequestError ||
      error instanceof PrismaClientRustPanicError ||
      error instanceof PrismaClientInitializationError ||
      error instanceof Error
    )
      throw new AppError(error.message, 500);
    throw new AppError('Erro desconhecido', 500);
  }
};

export { getTasks, editTask, createTask, removeTask };

import prisma from '../lib/prisma';
import { createTaskType, editTaskType } from '../types/tasksInterface';

const getTasks = async (id: string) => {
  const tasks = await prisma.task.findUnique({
    where: {
      id: parseInt(id),
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
        connect: { id: parseInt(id) },
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
  const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';

  const [editedTask] = await connection.execute(query, [title, description, status, id]);
  return editedTask;
};

const removeTask = async (id: string) => {
  const removedTask = await connection.execute('DELETE from tasks WHERE id = ?', [0]);
  return removedTask;
};

export { getTasks, editTask, createTask, removeTask };

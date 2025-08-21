const connection = require('./connection');
import { Request, Response } from 'express';
import { createTaskType, editTaskType } from '../types/tasksInterface';

const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};

const createTask = async (body: createTaskType) => {
  const { title, description } = body;

  const dateUTC = new Date(Date.now()).toUTCString();

  const query = 'INSERT INTO tasks(title, description, status, created_at) VALUES (?, ?, ?, ?)';

  const [createdTask] = await connection.execute(query, [title, description, 'pendente', dateUTC]);

  return { insertId: createdTask.insertId };
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

export { getAll, editTask, createTask, removeTask };

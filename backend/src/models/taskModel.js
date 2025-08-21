const connection = require('./connection');

const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};

const createTask = async (body) => {
  const { title, description } = body;
  console.log(title, description);

  const dateUTC = new Date(Date.now()).toUTCString();

  const query = 'INSERT INTO tasks(title, description, status, created_at) VALUES (?, ?, ?, ?)';

  const [createdTask] = await connection.execute(query, [title, description, 'pendente', dateUTC]);

  return { insertId: createdTask.insertId };
};

const editTask = async (tasks, id) => {
  const { title, description, status } = tasks;
  console.log(tasks);
  const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';

  const [editedTask] = await connection.execute(query, [title, description, status, id]);
  return editedTask;
};

const removeTask = async (id) => {
  const removedTask = await connection.execute('DELETE from tasks WHERE id = ?', [id]);
  return removedTask;
};

module.exports = {
  getAll,
  editTask,
  createTask,
  removeTask,
};

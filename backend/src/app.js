const express = require('express');
const tasksRouter = require('./routers/tasksRouter');
const usersRouter = require('./routers/usersRouter');

const app = express();

app.use(express.json());
app.use(tasksRouter);
app.use(usersRouter);

module.exports = app;

import express from 'express';
import tasksRouter from './routers/tasksRouter';
import usersRouter from './routers/usersRouter';

const app = express();

app.use(express.json());
app.use(tasksRouter);
app.use(usersRouter);

export default app;

import express from 'express';
import tasksRouter from './routes/tasksRouter';
import usersRouter from './routes/usersRouter';

const app = express();

app.use(express.json());
app.use(tasksRouter);
app.use(usersRouter);

export default app;

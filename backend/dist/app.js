import express from 'express';
import tasksRouter from './routes/tasksRouter.js';
import usersRouter from './routes/usersRouter.js';
const app = express();
app.use(express.json());
app.use(tasksRouter);
app.use(usersRouter);
export default app;

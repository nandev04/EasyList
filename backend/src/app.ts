import express from 'express';
import cookieParser from 'cookie-parser';
import tasksRouter from './routes/tasksRouter.js';
import usersRouter from './routes/usersRouter.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(tasksRouter);
app.use(usersRouter);

export default app;

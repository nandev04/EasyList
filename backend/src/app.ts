import express from 'express';
import cookieParser from 'cookie-parser';
import tasksRouter from './routes/tasksRouter.js';
import usersRouter from './routes/usersRouter.js';
import dotenv from 'dotenv';
import cleanRefreshTokenDb from './cron/refreshTokenCleanup.js';
import cleanResetCodeDb from './cron/passwordCodeCleanup.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();
cleanResetCodeDb();
cleanRefreshTokenDb();

// Middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(tasksRouter);
app.use(usersRouter);
app.use(errorHandler);

export default app;

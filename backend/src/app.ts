import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cleanRefreshTokenDb from './cron/refreshTokenCleanup.js';
import cleanResetCodeDb from './cron/passwordCodeCleanup.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { cleanupOldDevices } from './cron/cleanupOldDevices.js';
import taskRoutes from './modules/task/task.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/user/users.routes.js';

const app = express();
app.set('trust proxy', true);

dotenv.config();
cleanResetCodeDb();
cleanRefreshTokenDb();
cleanupOldDevices();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(authRoutes);
app.use(userRoutes);
app.use(taskRoutes);
app.use(errorHandler);

export default app;

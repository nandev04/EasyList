import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cleanRefreshTokenDb from './cron/refreshTokenCleanup.js';
import cleanResetCodeDb from './cron/passwordCodeCleanup.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { cleanupOldDevices } from './cron/cleanupOldDevices.js';
import taskRoutes from './modules/task/tasks.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/user/users.routes.js';

dotenv.config();
const app = express();
cleanResetCodeDb();
cleanRefreshTokenDb();
cleanupOldDevices();

// Middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(authRoutes);
app.use(taskRoutes);
app.use(userRoutes);
app.use(errorHandler);

export default app;

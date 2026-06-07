import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { errorHandler } from './shared/middlewares/errorHandler.js';
import taskRoutes from './modules/task/task.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/user/users.routes.js';
import refreshTokenCleanup from './cron/refreshToken.cleanup.js';
import resetPasswordCodeCleanup from './cron/passwordCode.cleanup.js';
import oldDevicesCleanup from './cron/oldDevices.cleanup.js';
import revokedDevicesCleanup from './cron/revokedDevices.cleanup.js';
import updateEmailCodeCleanup from './cron/updateEmailCode.cleanup.js';
import healthRoutes from './shared/health/health.route.js';

const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true
  })
);

app.set('trust proxy', true);

resetPasswordCodeCleanup();
refreshTokenCleanup();
oldDevicesCleanup();
revokedDevicesCleanup();
updateEmailCodeCleanup();

app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET));
app.use('/v1', healthRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1', userRoutes);
app.use('/v1', taskRoutes);
app.use(errorHandler);

export default app;

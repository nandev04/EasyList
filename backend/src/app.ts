import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.js';
import taskRoutes from './modules/task/task.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/user/users.routes.js';
import refreshTokenCleanup from './cron/refreshToken.cleanup.js';
import resetPasswordCodeCleanup from './cron/passwordCode.cleanup.js';
import oldDevicesCleanup from './cron/oldDevices.cleanup.js';
import updateEmailCodeCleanup from './cron/updateEmailCode.cleanup.js';
import * as Rate_Limit from './middlewares/rateLimit.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true
    })
  );
}

app.set('trust proxy', true);

dotenv.config();
resetPasswordCodeCleanup();
refreshTokenCleanup();
oldDevicesCleanup();
updateEmailCodeCleanup();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/auth', Rate_Limit.auth, authRoutes);
app.use(userRoutes);
app.use(taskRoutes);
app.use(errorHandler);

export default app;

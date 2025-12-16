import express from 'express';
import validate from '../../middlewares/validateData.js';
import {
  forgotPasswordBodySchema,
  loginUserBodySchema,
  refreshTokenUserCookieSchema,
  resetPasswordBodySchema,
  verifyCodeBodySchema,
  verifyUserQuerySchema
} from './auth.schema.js';
import * as Controller_Auth from './auth.controller.js';
import * as Controller_Login from './login.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';

const authRoutes = express.Router();

authRoutes.get(
  '/auth/verify',
  validate({ query: verifyUserQuerySchema }),
  Controller_Auth.verifyEmail
);

authRoutes.post(
  '/refresh-token',
  validate({ cookies: refreshTokenUserCookieSchema }),
  Controller_Auth.refreshToken
);

// recovery password
authRoutes.post(
  '/auth/forgot-password',
  validate({ body: forgotPasswordBodySchema }),
  Controller_Auth.forgotPassword
);

authRoutes.post(
  '/auth/verify-code',
  validate({ body: verifyCodeBodySchema }),
  Controller_Auth.verifyCode
);

authRoutes.post(
  '/auth/reset-password',
  validate({ body: resetPasswordBodySchema }),
  Controller_Auth.resetPassword
);

authRoutes.post(
  '/login',
  authenticate,
  validate({ body: loginUserBodySchema }),
  Controller_Login.loginUser
);

export default authRoutes;

import express from 'express';
import validate from '../../middlewares/validateData.js';
import {
  changePasswordBodySchema,
  forgotPasswordBodySchema,
  refreshTokenUserCookieSchema,
  resetPasswordBodySchema,
  verifyCodeBodySchema,
  verifyUserQuerySchema
} from './schema/auth.schema.js';
import * as Controller_Auth from './auth.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';
import * as Rate_Limit from '../../middlewares/rateLimit.js';
import requireAuth from '../../middlewares/requireAuth.js';
import loginRoutes from './use-cases/login/login.routes.js';
import logoutRoutes from './use-cases/logout/logout.routes.js';

const authRoutes = express.Router();

authRoutes.patch(
  '/verify',
  Rate_Limit.auth,
  validate({ query: verifyUserQuerySchema }),
  Controller_Auth.verifyEmail
);

authRoutes.post(
  '/refresh-token',
  Rate_Limit.auth,
  validate({ signedCookies: refreshTokenUserCookieSchema }),
  Controller_Auth.refreshToken
);

authRoutes.patch(
  '/auth/change-password',
  Rate_Limit.auth,
  authenticate,
  requireAuth,
  validate({ body: changePasswordBodySchema }),
  Controller_Auth.changePassword
);

// recovery password
authRoutes.post(
  '/auth/forgot-password',
  Rate_Limit.auth,
  validate({ body: forgotPasswordBodySchema }),
  Controller_Auth.forgotPassword
);

authRoutes.post(
  '/auth/verify-code',
  Rate_Limit.auth,
  validate({ body: verifyCodeBodySchema }),
  Controller_Auth.verifyCode
);

authRoutes.post(
  '/auth/reset-password',
  Rate_Limit.auth,
  validate({ body: resetPasswordBodySchema }),
  Controller_Auth.resetPassword
);

authRoutes.use('/login', loginRoutes);
authRoutes.use('/logout', logoutRoutes);

export default authRoutes;

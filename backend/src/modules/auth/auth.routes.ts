import express from 'express';
import validate from '../../middlewares/validateData.js';
import {
  changePasswordBodySchema,
  forgotPasswordBodySchema,
  refreshTokenUserCookieSchema,
  resetPasswordBodySchema,
  verifyCodeBodySchema
} from './auth.schema.js';
import * as Controller_Auth from './auth.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';
import * as Rate_Limit from '../../middlewares/rateLimit.js';
import requireAuth from '../../middlewares/requireAuth.js';
import loginRoutes from './use-cases/login/login.routes.js';
import logoutRoutes from './use-cases/logout/logout.routes.js';
import verifyAccRoutes from './use-cases/verifyAccount/verifyAcc.routes.js';

const authRoutes = express.Router();

authRoutes.use('/verify', verifyAccRoutes);

authRoutes.post(
  '/refresh-token',
  validate({ signedCookies: refreshTokenUserCookieSchema }),
  Controller_Auth.refreshToken
);

authRoutes.patch(
  '/auth/change-password',
  authenticate,
  requireAuth,
  validate({ body: changePasswordBodySchema }),
  Controller_Auth.changePassword
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

authRoutes.use('/login', loginRoutes);
authRoutes.use('/logout', logoutRoutes);

export default authRoutes;

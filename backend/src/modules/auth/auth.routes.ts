import express from 'express';
import validate from '../../middlewares/validateData.js';
import {
  changePasswordBodySchema,
  forgotPasswordBodySchema,
  loginUserBodySchema,
  refreshTokenUserCookieSchema,
  resetPasswordBodySchema,
  signedCookiesSchema,
  verifyCodeBodySchema,
  verifyUserQuerySchema
} from './auth.schema.js';
import * as Controller_Auth from './auth.controller.js';
import * as Controller_Login from './login.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';
import * as Rate_Limit from '../../middlewares/rateLimit.js';
import resolveSessionIfExists from '../../middlewares/resolveSessionIfExists.js';
import requireAuth from '../../middlewares/requireAuth.js';

const authRoutes = express.Router();

authRoutes.get(
  '/auth/verify',
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

authRoutes.post(
  '/login',
  Rate_Limit.auth,
  resolveSessionIfExists,
  validate({ body: loginUserBodySchema }),
  Controller_Login.loginUser
);

authRoutes.post(
  '/logout',
  authenticate,
  validate({ signedCookies: signedCookiesSchema }),
  Controller_Auth.logout
);

export default authRoutes;

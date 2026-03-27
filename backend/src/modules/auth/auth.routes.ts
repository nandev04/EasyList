import express from 'express';
import validate from '../../middlewares/validateData.js';
import { resetPasswordBodySchema } from './auth.schema.js';
import * as Controller_Auth from './auth.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';
import requireAuth from '../../middlewares/requireAuth.js';
import loginRoutes from './use-cases/login/login.routes.js';
import logoutRoutes from './use-cases/logout/logout.routes.js';
import verifyAccRoutes from './use-cases/verifyAccount/verifyAcc.routes.js';
import refreshTknRoutes from './use-cases/refreshToken/refreshTkn.routes.js';
import changePasswordRoutes from './use-cases/changePassword/changePwd.routes.js';
import resolveSessionIfExists from '../../middlewares/resolveSessionIfExists.js';
import forgotPwdRoutes from './use-cases/passwordRecovery/requestForgot/forgotPwd.routes.js';

const authRoutes = express.Router();

authRoutes.use('/verify', verifyAccRoutes);
authRoutes.use('/refresh-token', refreshTknRoutes);
authRoutes.use('/change-password', authenticate, requireAuth, changePasswordRoutes);
authRoutes.use('/auth/forgot-password', forgotPwdRoutes);
authRoutes.use('/auth/verify-code', forgotPwdRoutes);

// recovery password

authRoutes.post(
  '/auth/reset-password',
  validate({ body: resetPasswordBodySchema }),
  Controller_Auth.resetPassword
);

authRoutes.use('/login', resolveSessionIfExists, loginRoutes);
authRoutes.use('/logout', authenticate, logoutRoutes);

export default authRoutes;

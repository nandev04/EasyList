import express from 'express';
import { authenticate } from '../../shared/middlewares/authenticate.js';
import requireAuth from '../../shared/middlewares/requireAuth.js';
import loginRoutes from './use-cases/login/login.routes.js';
import logoutRoutes from './use-cases/logout/logout.routes.js';
import verifyAccRoutes from './use-cases/verifyAccount/verifyAcc.routes.js';
import changePasswordRoutes from './use-cases/changePassword/changePwd.routes.js';
import resolveSessionIfExists from './middlewares/resolveSessionIfExists.js';
import forgotPwdRoutes from './use-cases/passwordRecovery/requestForgot/forgotPwd.routes.js';
import resetPwdRoutes from './use-cases/passwordRecovery/resetPassword/resetPwd.routes.js';
import verifyOtpPwdRoutes from './use-cases/passwordRecovery/verifyOtp/verifyOtp.routes.js';
import * as Rate_Limit from './middlewares/rateLimit.js';

const authRoutes = express.Router();

authRoutes.use('/login', Rate_Limit.login, resolveSessionIfExists, loginRoutes);
authRoutes.use('/logout', Rate_Limit.logout, logoutRoutes);
authRoutes.use('/verify', Rate_Limit.general, verifyAccRoutes);
authRoutes.use(
  '/change-password',
  Rate_Limit.general,
  authenticate,
  requireAuth,
  changePasswordRoutes
);
authRoutes.use('/forgot-password', Rate_Limit.forgot_password, forgotPwdRoutes);
authRoutes.use('/verify-code', Rate_Limit.forgot_password, verifyOtpPwdRoutes);
authRoutes.use('/reset-password', Rate_Limit.forgot_password, resetPwdRoutes);

export default authRoutes;

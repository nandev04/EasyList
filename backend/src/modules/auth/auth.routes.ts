import express from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import requireAuth from '../../middlewares/requireAuth.js';
import loginRoutes from './use-cases/login/login.routes.js';
import logoutRoutes from './use-cases/logout/logout.routes.js';
import verifyAccRoutes from './use-cases/verifyAccount/verifyAcc.routes.js';
import refreshTknRoutes from './use-cases/refreshToken/refreshTkn.routes.js';
import changePasswordRoutes from './use-cases/changePassword/changePwd.routes.js';
import resolveSessionIfExists from '../../middlewares/resolveSessionIfExists.js';
import forgotPwdRoutes from './use-cases/passwordRecovery/requestForgot/forgotPwd.routes.js';
import resetPwdRoutes from './use-cases/passwordRecovery/resetPassword/resetPwd.routes.js';

const authRoutes = express.Router();

authRoutes.use('/verify', verifyAccRoutes);
authRoutes.use('/refresh-token', refreshTknRoutes);
authRoutes.use('/change-password', authenticate, requireAuth, changePasswordRoutes);
authRoutes.use('/forgot-password', forgotPwdRoutes);
authRoutes.use('/verify-code', forgotPwdRoutes);
authRoutes.use('/reset-password', resetPwdRoutes);
authRoutes.use('/login', resolveSessionIfExists, loginRoutes);
authRoutes.use('/logout', authenticate, logoutRoutes);

export default authRoutes;

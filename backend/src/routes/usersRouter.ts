import express from 'express';
import * as Controller from '../controllers/usersController.js';
import * as ControllerAuth from '../controllers/authController.js';
import { validateLogin } from '../middlewares/validateLogin.js';
import * as ControllerToken from '../controllers/refreshTokenController.js';
import * as ControllerResetPassword from '../controllers/resetPasswordController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

// Create User
router.get('/user', Controller.getUser);
router.post('/user', Controller.createUser);
router.patch('/user/:id', Controller.editUser);
router.delete('/user', Controller.deleteUser);
router.get('/auth/verify', ControllerAuth.verifyEmail);

// Login User

router.post('/login', authenticate, validateLogin, Controller.loginUser);

// Refresh Token
router.get('/auth/verify', ControllerAuth.verifyEmail);
router.post('/refresh-token', ControllerToken.refreshToken);

// recovery password
router.post('/auth/forgot-password', ControllerAuth.forgotPassword);
router.post('/auth/verify-code', ControllerAuth.verifyCode);
router.post('/auth/reset-password', ControllerResetPassword.resetPassword);

export default router;

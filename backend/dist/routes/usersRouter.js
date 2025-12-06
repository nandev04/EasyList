import express from 'express';
import * as Controller from '../controllers/usersController.js';
import * as ControllerAuth from '../controllers/authController.js';
import * as ControllerToken from '../controllers/refreshTokenController.js';
import * as ControllerResetPassword from '../controllers/resetPasswordController.js';
import { authenticate } from '../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';
import createUserSchema from '../schemas/users/createUser.schema.js';
import verifyUserSchema from '../schemas/users/verifyUser.schema.js';
import loginUserSchema from '../schemas/login/loginUser.schema.js';
import refreshSchemaUser from '../schemas/login/refreshTokenUser.schema.js';
import forgotPasswordSchema from '../schemas/auth/forgotPassword.schema.js';
import verifyCodeSchema from '../schemas/auth/verifyCode.schema.js';
const router = express.Router();
// Create User
router.get('/user', Controller.getUser);
router.post('/user', validate(createUserSchema), Controller.createUser);
// router.patch('/user/:id', validate(editUserSchema), Controller.editUser);
// Substituir rota antiga por uma rota menos genérica
// router.delete('/user', validate(deleteUserSchema), Controller.deleteUser);
// Substituir rota antiga por uma rota mais rigorosa
router.get('/auth/verify', validate(verifyUserSchema), ControllerAuth.verifyEmail);
// Login User
router.post('/login', authenticate, validate(loginUserSchema), Controller.loginUser);
// Refresh Token
router.post('/refresh-token', validate(refreshSchemaUser), ControllerToken.refreshToken);
// recovery password
router.post('/auth/forgot-password', validate(forgotPasswordSchema), ControllerAuth.forgotPassword);
router.post('/auth/verify-code', validate(verifyCodeSchema), ControllerAuth.verifyCode);
router.post('/auth/reset-password', ControllerResetPassword.resetPassword);
export default router;

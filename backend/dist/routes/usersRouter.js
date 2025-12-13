import express from 'express';
import * as Controller from '../controllers/usersController.js';
import * as ControllerAuth from '../controllers/authController.js';
import * as ControllerToken from '../controllers/refreshTokenController.js';
import * as ControllerResetPassword from '../controllers/resetPasswordController.js';
import { authenticate } from '../middlewares/authenticate.js';
import validate from '../middlewares/validateData.js';
import { createUserBodySchema } from '../schemas/users/createUser.schema.js';
import { verifyUserQuerySchema } from '../schemas/users/verifyUser.schema.js';
import { loginUserBodySchema } from '../schemas/login/loginUser.schema.js';
import { refreshTokenUserCookieSchema } from '../schemas/login/refreshTokenUser.schema.js';
import { forgotPasswordBodySchema } from '../schemas/auth/forgotPassword.schema.js';
import { verifyCodeBodySchema } from '../schemas/auth/verifyCode.schema.js';
import { resetPasswordBodySchema } from '../schemas/auth/resetPassword.schema.js';
const router = express.Router();
// Create User
router.get('/user', Controller.getUser);
router.post('/user', validate({ body: createUserBodySchema }), Controller.createUser);
// router.patch('/user/:id', validate(editUserSchema), Controller.editUser);
// Substituir rota antiga por uma rota menos genérica
// router.delete('/user', validate(deleteUserSchema), Controller.deleteUser);
// Substituir rota antiga por uma rota mais rigorosa
router.get('/auth/verify', validate({ query: verifyUserQuerySchema }), ControllerAuth.verifyEmail);
// Login User
router.post('/login', authenticate, validate({ body: loginUserBodySchema }), Controller.loginUser);
// Refresh Token
router.post('/refresh-token', validate({ cookies: refreshTokenUserCookieSchema }), ControllerToken.refreshToken);
// recovery password
router.post('/auth/forgot-password', validate({ body: forgotPasswordBodySchema }), ControllerAuth.forgotPassword);
router.post('/auth/verify-code', validate({ body: verifyCodeBodySchema }), ControllerAuth.verifyCode);
router.post('/auth/reset-password', validate({ body: resetPasswordBodySchema }), ControllerResetPassword.resetPassword);
export default router;

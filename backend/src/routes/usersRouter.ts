import express from 'express';
import * as Controller from '../controllers/usersController.js';
import * as ControllerAuth from '../controllers/authController.js';
import validateLogin from '../middlewares/validateLogin.js';
import * as ControllerToken from '../controllers/refreshTokenController.js';

const router = express.Router();

// Create User
router.get('/user', Controller.getUser);
router.post('/user', Controller.createUser);
router.patch('/user/:id', Controller.editUser);
router.delete('/user', Controller.deleteUser);
router.patch('/auth/verify', ControllerAuth.verifyEmail);

// Login User

router.post('/login', validateLogin, Controller.loginUser);

// Refresh Token
router.post('/refresh-token', ControllerToken.refreshToken);

export default router;

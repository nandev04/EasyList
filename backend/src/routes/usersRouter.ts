import express from 'express';
import * as Controller from '../controllers/usersController.js';
import * as ControllerAuth from '../controllers/authController.js';

const router = express.Router();

router.get('/user', Controller.getUser);
router.post('/user', Controller.createUser);
router.get('/user/verify', ControllerAuth.verifyEmail);
router.patch('/user/:id', Controller.editUser);
router.delete('/user', Controller.deleteUser);

export default router;

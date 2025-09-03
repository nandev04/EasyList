import express from 'express';
import * as Controller from '../controllers/usersController.js';
const router = express.Router();
router.get('/users', Controller.getUser);
router.post('/users', Controller.createUser);
router.patch('/users/:id', Controller.editUser);
export default router;

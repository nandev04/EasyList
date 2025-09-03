import express from 'express';
import { createUser, getUser } from '../controllers/usersController.js';
const router = express.Router();
router.get('/users', getUser);
router.post('/users', createUser);
export default router;

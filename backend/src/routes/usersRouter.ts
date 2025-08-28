import express from 'express';
import { getUsersController } from '../controllers/usersController';

const router = express.Router();

router.get('/users', getUsersController);

export default router;

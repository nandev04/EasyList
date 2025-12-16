import express from 'express';
import * as Controller from './login.controller';
import { authenticate } from '../../middlewares/authenticate.js';
import validate from '../../middlewares/validateData.js';
import { loginUserBodySchema } from './login.schema.js';

const router = express.Router();
router.post('/login', authenticate, validate({ body: loginUserBodySchema }), Controller.loginUser);

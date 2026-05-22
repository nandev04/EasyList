import express from 'express';
import { loginUserBodySchema } from './login.schema.js';
import validate from '../../../../shared/middlewares/validateData.js';
import * as Controller_Login from './login.controller.js';

const loginRoutes = express.Router();

loginRoutes.post('/', validate({ body: loginUserBodySchema }), Controller_Login.loginUser);

export default loginRoutes;

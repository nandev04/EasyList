import express from 'express';
import * as Rate_Limit from '../../../../middlewares/rateLimit.js';
import resolveSessionIfExists from '../../../../middlewares/resolveSessionIfExists.js';
import { loginUserBodySchema } from '../../schema/login.schema.js';
import validate from '../../../../middlewares/validateData.js';
import * as Controller_Login from './login.controller.js';

const loginRoutes = express.Router();

loginRoutes.post(
  '/login',
  Rate_Limit.auth,
  resolveSessionIfExists,
  validate({ body: loginUserBodySchema }),
  Controller_Login.loginUser
);

export default loginRoutes;

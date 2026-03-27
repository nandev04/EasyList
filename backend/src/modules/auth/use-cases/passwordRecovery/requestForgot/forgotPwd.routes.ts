import { Router } from 'express';
import validate from '../../../../../middlewares/validateData.js';
import { forgotPasswordBodySchema } from './forgotPwd.schema.js';
import * as Controller_ForgotPwd from './forgotPwd.controller.js';

const forgotPwdRoutes = Router();

forgotPwdRoutes.post(
  '/',
  validate({ body: forgotPasswordBodySchema }),
  Controller_ForgotPwd.forgotPassword
);

export default forgotPwdRoutes;

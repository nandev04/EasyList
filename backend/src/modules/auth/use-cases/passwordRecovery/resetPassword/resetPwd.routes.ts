import { Router } from 'express';
import validate from '../../../../../middlewares/validateData.js';
import { resetPasswordBodySchema } from './resetPwd.schema.js';
import * as Controller_ResetPwd from './resetPwd.controller.js';

const resetPwdRoutes = Router();

resetPwdRoutes.post(
  '/',
  validate({ body: resetPasswordBodySchema }),
  Controller_ResetPwd.resetPassword
);

export default resetPwdRoutes;

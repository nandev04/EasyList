import { Router } from 'express';
import validate from '../../../../middlewares/validateData.js';
import { changePasswordBodySchema } from './changePwd.schema.js';
import * as Controller_ChangePwd from './changePwd.controller.js';

const changePasswordRoutes = Router();

changePasswordRoutes.patch(
  '/',
  validate({ body: changePasswordBodySchema }),
  Controller_ChangePwd.changePassword
);

export default changePasswordRoutes;

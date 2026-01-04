import express from 'express';
import * as Controller from './user.controller.js';
import validate from '../../middlewares/validateData.js';
import { createUserBodySchema } from './user.schema.js';
import { updateUserSchemaBody } from './user.schema.js';
import { validateJwt } from '../../middlewares/validateJwt.js';
import * as Rate_Limit from '../../middlewares/rateLimit.js';

const userRoutes = express.Router();

userRoutes.post(
  '/user',
  Rate_Limit.createUser,
  validate({ body: createUserBodySchema }),
  Controller.createUser
);
userRoutes.patch(
  '/user/',
  Rate_Limit.editUser,
  validateJwt,
  validate({ body: updateUserSchemaBody }),
  Controller.updateUser
);
userRoutes.delete('/user', Rate_Limit.deleteUser, validateJwt, Controller.deleteUser);

export default userRoutes;

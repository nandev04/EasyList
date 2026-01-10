import express from 'express';
import * as Controller from './user.controller.js';
import validate from '../../middlewares/validateData.js';
import { createUserBodySchema } from './user.schema.js';
import { updateUserSchemaBody } from './user.schema.js';
import { validateJwt } from '../../middlewares/validateJwt.js';
import * as Rate_Limit from '../../middlewares/rateLimit.js';
import * as Validate_Avatar from '../../middlewares/validateFile.js';

const userRoutes = express.Router();

userRoutes.get('/user', Rate_Limit.getUser, validateJwt, Controller.getUser);

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

userRoutes.post(
  '/avatar/upload',
  validateJwt,
  Validate_Avatar.uploadAvatar.single('avatar'),
  Controller.uploadAvatar
);

export default userRoutes;

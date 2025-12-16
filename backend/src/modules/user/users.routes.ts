import express from 'express';
import * as Controller from './user.controller.js';
import validate from '../../middlewares/validateData.js';
import { createUserBodySchema } from './user.schema.js';
import { updateUserSchemaBody } from './user.schema.js';
import { validateJwt } from '../../middlewares/validateJwt.js';

const userRoutes = express.Router();

userRoutes.post('/user', validate({ body: createUserBodySchema }), Controller.createUser);
userRoutes.patch(
  '/user/',
  validateJwt,
  validate({ body: updateUserSchemaBody }),
  Controller.updateUser
);
userRoutes.delete('/user', validateJwt, Controller.deleteUser);

export default userRoutes;

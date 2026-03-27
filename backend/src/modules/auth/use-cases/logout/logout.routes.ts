import { Router } from 'express';
import { authenticate } from '../../../../middlewares/authenticate.js';
import validate from '../../../../middlewares/validateData.js';
import * as Controller_Logout from './logout.controller.js';
import { signedCookiesSchema } from './logout.schema.js';

const logoutRoutes = Router();

logoutRoutes.post('/', validate({ signedCookies: signedCookiesSchema }), Controller_Logout.logout);

export default logoutRoutes;

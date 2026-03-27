import { Router } from 'express';
import validate from '../../../../middlewares/validateData.js';
import { refreshTknUserCookieSchema } from './refreshTkn.schema.js';
import * as Controller_RefreshTkn from './refreshTkn.controller.js';

const refreshTknRoutes = Router();

refreshTknRoutes.post(
  '/',
  validate({ signedCookies: refreshTknUserCookieSchema }),
  Controller_RefreshTkn.refreshToken
);

export default refreshTknRoutes;

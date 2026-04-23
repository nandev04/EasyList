import { Router } from 'express';
import validate from '../../../../middlewares/validateData.js';
import { resendToken, verifyAccountQuerySchema } from './verifyAcc.schema.js';
import * as Controller_VerifyAcc from './verifyAcc.controller.js';

const verifyAccRoutes = Router();

verifyAccRoutes.patch(
  '/',
  validate({ body: verifyAccountQuerySchema }),
  Controller_VerifyAcc.verifyAccount
);

verifyAccRoutes.post('/resend', validate({ body: resendToken }), Controller_VerifyAcc.resendToken);

export default verifyAccRoutes;

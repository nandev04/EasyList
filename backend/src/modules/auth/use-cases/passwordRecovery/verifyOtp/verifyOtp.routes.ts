import { Router } from 'express';
import validate from '../../../../../middlewares/validateData.js';
import { verifyOtpPwdBodySchema } from './verifyOtp.schema.js';
import * as Controller_VerifyOtp from './verifyOtp.controller.js';

const verifyOtpPwdRoutes = Router();

verifyOtpPwdRoutes.post(
  '/',
  validate({ body: verifyOtpPwdBodySchema }),
  Controller_VerifyOtp.verifyOtpPwd
);

import { NextFunction, Request, Response } from 'express';
import { verifyOtpPwdBodySchemaType } from './verifyOtp.schema.js';
import * as Service_VerifyOtpPwd from './verifyOtp.service.js';

const verifyOtpPwd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, email } = <verifyOtpPwdBodySchemaType>req.validated!.body;
    const tokenReset = await Service_VerifyOtpPwd.verifyCodeService(code, email);

    return res.status(200).json(tokenReset);
  } catch (err) {
    next(err);
  }
};

export { verifyOtpPwd };

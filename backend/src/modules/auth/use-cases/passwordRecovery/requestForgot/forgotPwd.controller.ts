import { NextFunction, Request, Response } from 'express';
import { forgotPasswordBodyType } from './forgotPwd.schema.js';
import * as Service_ForgotPwd from './forgotPwd.service.js';

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = <forgotPasswordBodyType>req.validated!.body;
    await Service_ForgotPwd.forgotPasswordService(email);

    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export { forgotPassword };

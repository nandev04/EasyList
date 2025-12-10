import { NextFunction, Request, Response } from 'express';
import * as resetPasswordService from '../services/resetPasswordService.js';
import { resetPasswordBodyType } from '../schemas/auth/resetPassword.schema.js';

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword, tokenResetPassword } = <resetPasswordBodyType>req.validated!.body;

    const updatedPassword = await resetPasswordService.resetPassword(
      newPassword,
      tokenResetPassword
    );

    return res.status(200).json(updatedPassword);
  } catch (err) {
    next(err);
  }
};

export { resetPassword };

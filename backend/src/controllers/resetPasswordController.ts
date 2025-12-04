import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/error.js';
import * as resetPasswordService from '../services/resetPasswordService.js';

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword, tokenResetPassword } = req.body;

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

import { NextFunction, Request, Response } from 'express';
import * as Service_ChangePwd from './changePwd.service.js';
import { changePasswordBodyType } from './changePwd.schema.js';

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const { newPassword, currentPassword } = <changePasswordBodyType>req.validated!.body;
    await Service_ChangePwd.changePassword(userId, currentPassword, newPassword);

    return res.status(200).json({ message: 'Operação realizada com sucesso' });
  } catch (err) {
    next(err);
  }
};

export { changePassword };

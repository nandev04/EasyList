import { Request, Response, NextFunction } from 'express';
import { verifyAccountQuerySchemaType } from './verifyAcc.schema.js';
import * as Service_Verify from './verifyAcc.service.js';

const verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = <verifyAccountQuerySchemaType>req.validated!.body;
    await Service_Verify.verifyAccountToken(token);

    return res.status(200).json({ message: 'Usuário verificado com sucesso' });
  } catch (err) {
    next(err);
  }
};

export { verifyAccount };

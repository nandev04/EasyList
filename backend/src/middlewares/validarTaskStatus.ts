import { Request, Response, NextFunction } from 'express';
import { taskStatus } from '../types/tasksInterface';

const validateTaskStatus = (req: Request, _res: Response, next: NextFunction) => {
  const { status } = req.body;

  if (status && !Object.values(taskStatus).includes(status)) {
    const error = new Error(
      `Status inválido. Valores permitidos: ${Object.values(taskStatus).join(', ')}`,
    );
    (error as any).status = 400;
    return next(error);
  }

  next();
};

export default validateTaskStatus;

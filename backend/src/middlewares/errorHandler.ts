import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error.js';
import { ZodError } from 'zod';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  // Erro Zod-Validation
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        type: 'validation_error',
        fields: Object.fromEntries(err.issues.map((issue) => [issue.path.join('.'), issue.message]))
      }
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  // Erros inesperados
  return res.status(500).json({
    message: err.message
  });
};

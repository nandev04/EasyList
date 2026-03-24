import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/utils/error.js';
import { ZodError } from 'zod';
import multer from 'multer';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        type: 'validation_error',
        fields: Object.fromEntries(err.issues.map((issue) => [issue.path.join('.'), issue.message]))
      }
    });
  }

  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({ error: 'Arquivo muito grande' });
      case 'LIMIT_FILE_COUNT':
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({ error: err.message });
      default:
        return res.status(400).json({ error: err.message });
    }
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  // Erros inesperados
  return res.status(500).json({ message: err });
};

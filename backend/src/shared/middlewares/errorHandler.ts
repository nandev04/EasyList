import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error.js';
import { ZodError } from 'zod';
import multer from 'multer';
import { errorResponse } from '../utils/response/response.js';
import { Prisma } from '@prisma/client';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    const response = errorResponse({
      code: 'VALIDATION_ERROR',
      status: 400,
      message: 'Erro na validação dos dados',
      details: {
        fields: Object.fromEntries(err.issues.map((issue) => [issue.path.join('.'), issue.message]))
      }
    });

    return res.status(400).json(response);
  }

  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(413).json(
          errorResponse({
            code: err.code,
            status: 413,
            message: 'Arquivo muito grande'
          })
        );
      case 'LIMIT_FILE_COUNT':
        return res.status(400).json(
          errorResponse({
            code: err.code,
            status: 400,
            message: 'Excedeu limite de arquivos'
          })
        );
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json(
          errorResponse({
            code: err.code,
            status: 400,
            message: 'Nome do campo inválido. Campo esperado: Avatar'
          })
        );
      default:
        return res.status(400).json(
          errorResponse({
            code: err.code,
            status: 400,
            message: 'Ocorreu um erro com o arquivo enviado'
          })
        );
    }
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return res.status(409).json(
          errorResponse({
            code: 'UNIQUE_VIOLATION',
            status: 409,
            message: 'Já existe registro com esses dados',
            details: { fields: err.meta?.target as string[] | undefined }
          })
        );
      case 'P2003':
        return res.status(400).json(
          errorResponse({
            code: 'FOREIGN_KEY_VIOLATION',
            status: 400,
            message: 'Referência inválida',
            details: { field: err.meta?.field_name }
          })
        );
      default:
        console.error('[errorHandler] Prisma error não mapeado:', err.code, err.message);
        return res.status(500).json(
          errorResponse({
            code: 'DATABASE_ERROR',
            status: 500,
            message: 'Erro no banco de dados'
          })
        );
    }
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(
      errorResponse({
        code: err.code,
        status: err.statusCode,
        message: err.message
      })
    );
  }

  // Erros inesperados
  console.error('[errorHandler] Erro inesperado:', err);
  return res.status(500).json(
    errorResponse({
      code: 'INTERNAL_SERVER_ERROR',
      status: 500,
      message: 'Ocorreu um erro interno'
    })
  );
};

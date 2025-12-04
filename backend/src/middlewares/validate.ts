import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';

const validate = <T extends ZodType>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw next(new ZodError(result.error.issues));
    }

    // FAZER LÓGICA DE VALIDACAO DE DADOS

    console.log('Dados validados com sucesso.', result.data);

    req.body = result.data;
    next();
  };
};

export default validate;

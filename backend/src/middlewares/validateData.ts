import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

type Schemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
  cookies?: ZodType;
  signedCookies?: ZodType;
  file?: ZodType;
};

const validate = (schema: Schemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated: Record<string, unknown> = {};

      if (schema.query) {
        const result = schema.query.safeParse(req.query);
        if (!result.success) return next(result.error);
        validated.query = result.data;
      }

      if (schema.params) {
        const result = schema.params.safeParse(req.params);
        if (!result.success) return next(result.error);
        validated.params = result.data;
      }

      if (schema.body) {
        const result = schema.body.safeParse(req.body);
        if (!result.success) return next(result.error);
        validated.body = result.data;
      }

      if (schema.cookies) {
        const result = schema.cookies.safeParse(req.cookies);
        if (!result.success) return next(result.error);
        validated.cookies = result.data;
      }

      if (schema.signedCookies) {
        const result = schema.signedCookies.safeParse(req.signedCookies);
        if (!result.success) return next(result.error);
        validated.signedCookies = result.data;
      }

      if (schema.file) {
        const result = schema.file.safeParse(req.file);
        if (!result.success) return next(result.error);
        validated.file = result.data;
      }

      req.validated = validated;

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validate;

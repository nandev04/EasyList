import { Request } from 'express';

export type ValidatedRequest<T> = Request & {
  validated: T;
};

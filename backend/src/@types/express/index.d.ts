import 'express';

declare module 'express' {
  export interface Request {
    validated?: {
      body?: unknown;
      params?: unknown;
      query?: unknown;
    };
    userId?: number;
  }
}

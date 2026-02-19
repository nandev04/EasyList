import 'express';

declare module 'express' {
  export interface Request {
    validated?: {
      body?: unknown;
      params?: unknown;
      query?: unknown;
      cookies?: unknown;
      signedCookies?: unknown;
    };
    userId?: number;
  }
}

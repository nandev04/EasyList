export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.name = 'AppError';
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;

    Object.defineProperty(this, 'message', {
      value: message,
      enumerable: true,
      writable: false
    });

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

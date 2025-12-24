export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'AppError';
    this.message = message;
    this.statusCode = statusCode;

    Object.defineProperty(this, 'message', {
      value: message,
      enumerable: true,
      writable: false
    });

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

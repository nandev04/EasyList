// errors/AppError.ts
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype); // necessário para instanceof funcionar
    }
}

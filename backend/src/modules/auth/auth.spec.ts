vi.mock('../../shared/utils/refreshTokenUtils');
import jwt from 'jsonwebtoken';
import { generateVerifyToken } from '../../shared/utils/refreshTokenUtils';
import { emailVerificationAccount } from './auth.service';

describe('emailVerificationAccount', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...OLD_ENV,
      JWT_EMAIL_SECRET: 'EMAIL_SECRET_TEST'
    };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  const { userId, email } = {
    userId: 7,
    email: 'teste@gmail.com'
  };

  test('should throw a dotenv error with the message: JWT_EMAIL_SECRET não definido! and statusCode 500', async () => {
    delete process.env.JWT_EMAIL_SECRET;

    await expect(emailVerificationAccount(userId, email)).rejects.toMatchObject({
      message: 'JWT_EMAIL_SECRET não definido!',
      statusCode: 500
    });
  });

  test('should throw an JsonWebTokenError if the parameter type is incorrect with a statusCode of 401.', async () => {
    const jwtError = new jwt.JsonWebTokenError('Token Inválido');

    vi.mocked(generateVerifyToken).mockImplementation(() => {
      throw jwtError;
    });

    await expect(emailVerificationAccount).rejects.toMatchObject({
      message: 'Token Inválido',
      statusCode: 401
    });
  });

  test('should throw an AppError for general errors', async () => {
    vi.mocked(generateVerifyToken).mockImplementation(() => {
      throw new Error('Falha inesperada');
    });

    await expect(emailVerificationAccount(userId, email)).rejects.toMatchObject({
      message: 'Falha inesperada',
      statusCode: 500
    });
  });
});

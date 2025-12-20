vi.mock('../../shared/utils/TokenUtils');
vi.mock('../user/user.model');
import jwt from 'jsonwebtoken';
import { generateVerifyToken, utilJwtVerify } from '../../shared/utils/TokenUtils';
import { emailVerificationAccount, verifyTokenEmailAccount } from './auth.service';
import * as Model_User from '../user/user.model';

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

describe('verifyTokenEmailAccount', async () => {
  test('Should successfully verify jwt token and call verifyUser function.', async () => {
    const returnModelVerifyUser = {
      verified: true,
      updatedAt: new Date()
    };
    vi.mocked(utilJwtVerify).mockResolvedValue({ userId: 7 });
    vi.mocked(Model_User.verifyUser).mockResolvedValue(returnModelVerifyUser);

    await verifyTokenEmailAccount('token-test');
    expect(utilJwtVerify).toBeCalledTimes(1);
    expect(Model_User.verifyUser).toBeCalledWith(7);
    expect(Model_User.verifyUser).toBeCalledTimes(1);
  });
});

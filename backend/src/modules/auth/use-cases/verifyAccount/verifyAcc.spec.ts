import jwt from 'jsonwebtoken';
import { emailAccountVerification, verifyAccountToken } from './verifyAcc.service.js';
import * as User_Repository from '../../../user/user.repository.js';
import * as tokenUtils from '../../../../shared/utils/TokenUtils.js';
import { createUserId } from '../../../../shared/utils/uuid.js';

const { userId, email } = {
  userId: createUserId(),
  email: 'teste@gmail.com'
};

describe('verifyTokenEmailAccount', async () => {
  const OLD_ENV = process.env;
  afterEach(() => {
    vi.restoreAllMocks();
    process.env = OLD_ENV;
  });

  test('Should successfully verify jwt token and call verifyUser function.', async () => {
    const returnRepositoryVerifyUser = {
      verified: true,
      updatedAt: new Date()
    };

    vi.spyOn(tokenUtils, 'utilJwtVerifyEmail').mockResolvedValue({ userId });
    vi.spyOn(User_Repository, 'verifyUser').mockResolvedValue(returnRepositoryVerifyUser);

    await verifyAccountToken('token-test');
    expect(tokenUtils.utilJwtVerifyEmail).toBeCalledTimes(1);
    expect(User_Repository.verifyUser).toBeCalledWith(userId);
    expect(User_Repository.verifyUser).toBeCalledTimes(1);
  });
});

describe('emailVerificationAccount', () => {
  const ORIGINAL_ENV = process.env.JWT_EMAIL_SECRET;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should throw a dotenv error with the message: JWT_EMAIL_SECRET não definido! and statusCode 500', async () => {
    delete process.env.JWT_EMAIL_SECRET;

    await expect(emailAccountVerification(userId, email)).rejects.toMatchObject({
      message: 'JWT_EMAIL_SECRET não definido!',
      statusCode: 500
    });

    process.env.JWT_EMAIL_SECRET = ORIGINAL_ENV;
  });

  test('should throw an JsonWebTokenError if the parameter type is incorrect with a statusCode of 401.', async () => {
    const jwtError = new jwt.JsonWebTokenError('Token Inválido');

    vi.spyOn(tokenUtils, 'generateVerifyToken').mockImplementation(() => {
      throw jwtError;
    });

    await expect(emailAccountVerification).rejects.toMatchObject({
      message: 'Token Inválido',
      statusCode: 401
    });
  });

  test('should throw an AppError for general errors', async () => {
    vi.spyOn(tokenUtils, 'generateVerifyToken').mockImplementation(() => {
      throw new Error('Falha inesperada');
    });

    await expect(emailAccountVerification(userId, email)).rejects.toMatchObject({
      message: 'Falha inesperada',
      statusCode: 500
    });
  });
});

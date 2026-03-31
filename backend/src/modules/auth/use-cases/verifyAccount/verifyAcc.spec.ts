import jwt from 'jsonwebtoken';
import { emailAccountVerification, verifyAccountToken } from './verifyAcc.service.js';
import * as Repository_User from '../../../user/user.repository.js';
import { generateVerifyToken, utilJwtVerifyEmail } from '../../../../shared/utils/TokenUtils.js';
import { createUserId } from '../../../../shared/utils/uuid.js';

vi.mock('../../../user/user.repository.js');
vi.mock('../../../../shared/utils/TokenUtils.js');

const { userId, email } = {
  userId: createUserId(),
  email: 'teste@gmail.com'
};

describe('verifyTokenEmailAccount', async () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Should successfully verify jwt token and call verifyUser function.', async () => {
    const returnRepositoryVerifyUser = {
      verified: true,
      updatedAt: new Date()
    };
    vi.mocked(utilJwtVerifyEmail).mockResolvedValue({ userId });
    vi.mocked(Repository_User.verifyUser).mockResolvedValue(returnRepositoryVerifyUser);

    await verifyAccountToken('token-test');
    expect(utilJwtVerifyEmail).toBeCalledTimes(1);
    expect(Repository_User.verifyUser).toBeCalledWith(userId);
    expect(Repository_User.verifyUser).toBeCalledTimes(1);
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

    vi.mocked(generateVerifyToken).mockImplementation(() => {
      throw jwtError;
    });

    await expect(emailAccountVerification).rejects.toMatchObject({
      message: 'Token Inválido',
      statusCode: 401
    });
  });

  test('should throw an AppError for general errors', async () => {
    vi.mocked(generateVerifyToken).mockImplementation(() => {
      throw new Error('Falha inesperada');
    });

    await expect(emailAccountVerification(userId, email)).rejects.toMatchObject({
      message: 'Falha inesperada',
      statusCode: 500
    });
  });
});

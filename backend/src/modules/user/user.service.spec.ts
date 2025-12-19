vi.mock('../../shared/utils/crypto');
vi.mock('../auth/auth.service');
vi.mock('./user.model');

import { AppError } from '../../shared/utils/error';
import { createHashPassword } from '../../shared/utils/crypto';
import * as Service_Auth from '../auth/auth.service';
import * as Model_User from './user.model';
import { createUser } from './user.service';

describe('Create user flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const { username, password, email } = {
    username: 'Teste',
    password: 'password_teste',
    email: 'teste@gmail.com'
  };
  const hashPassword = 'hashed_password';
  const result = { id: 777, username: 'teste', email: 'teste@gmail.com' };

  test('Should create a user and request email verification.', async () => {
    vi.mocked(createHashPassword).mockResolvedValue(hashPassword);
    vi.mocked(Model_User.createUser).mockResolvedValue(result);
    vi.mocked(Service_Auth.emailVerificationAccount).mockResolvedValue(undefined);

    const createdUser = await createUser({ username, password, email });

    expect(createHashPassword).toHaveBeenCalledWith(password);
    expect(Model_User.createUser).toHaveBeenCalledWith({ username, hashPassword, email });
    expect(Service_Auth.emailVerificationAccount).toHaveBeenCalledWith(
      createdUser.id,
      createdUser.email
    );
    expect(Service_Auth.emailVerificationAccount).toHaveBeenCalledTimes(1);

    expect(createdUser).toEqual(result);
  });

  test('Should throw AppError if hash fails', async () => {
    const error = new AppError('Senha inválida', 400);
    vi.mocked(createHashPassword).mockRejectedValue(error);

    await expect(createUser({ username, password, email })).rejects.toBe(error);
  });

  test('Should throw an AppError with status 500 for generic errors.', async () => {
    vi.mocked(createHashPassword).mockResolvedValue(hashPassword);
    vi.mocked(Model_User.createUser).mockResolvedValue(result);
    vi.mocked(Service_Auth.emailVerificationAccount).mockRejectedValue(new Error('Erro interno'));

    await expect(createUser({ username, password, email })).rejects.toMatchObject({
      message: 'Erro interno',
      statusCode: 500
    });
  });
});

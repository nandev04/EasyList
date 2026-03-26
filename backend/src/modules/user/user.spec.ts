vi.mock('../../shared/utils/crypto');
vi.mock('../auth/auth.service');
vi.mock('./user.repository');
vi.mock('../../shared/utils/S3ClientCommands');
vi.mock('../../shared/utils/uuid');

import { AppError } from '../../shared/utils/error';
import { createHashPassword } from '../../shared/utils/crypto';
import * as Service_Auth from '../auth/auth.service';
import * as Repository_User from './user.repository';
import * as Service_User from './user.service';
import { userCreateSelect, userPublicSelect } from './user.select';
import { Prisma } from '@prisma/client/default';
import { getAvatarS3, generateSignedUrl } from '../../shared/utils/S3ClientCommands';
import { createUserId } from '../../shared/utils/uuid';

type ReturnGetUserType = Prisma.UserGetPayload<{
  select: typeof userPublicSelect;
}>;
const userIdMock = 'uuidv7-id-teste';
describe('get user flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Should get user from the repository by id', async () => {
    const returnGetUser = {
      id: userIdMock,
      email: 'email@test.com',
      firstname: 'testeFn',
      lastname: 'testeLn',
      username: 'usernameTest',
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      avatarKey: 'avatar/url/test'
    } satisfies ReturnGetUserType;

    vi.mocked(Repository_User.getUser).mockResolvedValue(returnGetUser);

    await Service_User.getUser(userIdMock);

    expect(getAvatarS3).toHaveBeenCalledTimes(1);
    expect(getAvatarS3).toHaveBeenCalledWith(returnGetUser.avatarKey);
    expect(generateSignedUrl).toHaveBeenCalledTimes(1);

    expect(Repository_User.getUser).toHaveBeenCalledWith(userIdMock, userPublicSelect);
    expect(Repository_User.getUser).toHaveBeenCalledTimes(1);
  });
});

describe('Create user flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const testInput = {
    firstname: 'NomeTeste',
    lastname: 'SobrenomeTeste',
    username: 'Teste',
    password: 'password_teste',
    email: 'teste@gmail.com'
  };
  const hashPassword = 'hashed_password';
  const result = {
    id: 777,
    firstname: 'testeFn',
    lastname: 'testeLn',
    username: 'teste',
    email: 'teste@gmail.com',
    avatarKey: 'avtkey'
  };

  test('Should create a user and request email verification.', async () => {
    vi.mocked(createHashPassword).mockResolvedValue(hashPassword);
    vi.mocked(Repository_User.createUser).mockResolvedValue(result);
    vi.mocked(Service_Auth.emailVerificationAccount).mockResolvedValue(undefined);
    vi.mocked(createUserId).mockReturnValue(userIdMock);

    const { password, ...safeInput } = testInput;

    const dataCreate = {
      id: userIdMock,
      hashPassword,
      ...safeInput
    };
    const createdUser = await Service_User.createUser(testInput);

    expect(createHashPassword).toHaveBeenCalledWith(testInput.password);
    expect(createUserId).toHaveBeenCalledBefore(vi.mocked(Repository_User.createUser));

    expect(Repository_User.createUser).toHaveBeenCalledWith(dataCreate, userCreateSelect);
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

    await expect(Service_User.createUser(testInput)).rejects.toBe(error);
  });

  test('Should throw an AppError with status 500 for generic errors.', async () => {
    vi.mocked(createHashPassword).mockResolvedValue(hashPassword);
    vi.mocked(Repository_User.createUser).mockResolvedValue(result);
    vi.mocked(Service_Auth.emailVerificationAccount).mockRejectedValue(new Error('Erro interno'));

    await expect(Service_User.createUser(testInput)).rejects.toMatchObject({
      message: 'Erro interno',
      statusCode: 500
    });
  });
});

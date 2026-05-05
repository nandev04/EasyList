import { AppError } from '../../shared/utils/error.js';
import * as VerifyAcc_Service from '../auth/use-cases/verifyAccount/verifyAcc.service.js';
import * as Repository_User from './user.repository.js';
import * as Service_User from './user.service.js';
import { userCreateSelect, userPublicSelect } from './user.select.js';
import * as awsUtils from '../../shared/utils/aws/awsUtils.js';
import * as argon2Utils from '../../shared/utils/argon2/argon2Utils.js';
import * as uuidUtils from '../../shared/utils/uuid/uuidUtils.js';
import { GetObjectCommand } from '@aws-sdk/client-s3';

const userIdMock = uuidUtils.generateUUIDv7();
describe('Get User flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Should throw an AppError with status code 404 and message: "Usuário não encontrado" if user not found', async () => {
    vi.spyOn(Repository_User, 'getUser').mockResolvedValue(null);

    await expect(Service_User.getUser(userIdMock)).rejects.toMatchObject({
      message: 'Usuário não encontrado',
      statusCode: 404
    });
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
    };

    vi.spyOn(Repository_User, 'getUser').mockResolvedValue(returnGetUser);
    vi.spyOn(awsUtils, 'getAvatarS3').mockResolvedValue(
      new GetObjectCommand({ Bucket: 'test', Key: 'test' })
    );
    vi.spyOn(awsUtils, 'generateSignedUrlS3').mockResolvedValue('signedUrlTest');

    await Service_User.getUser(userIdMock);

    expect(awsUtils.getAvatarS3).toHaveBeenCalledTimes(1);
    expect(awsUtils.getAvatarS3).toHaveBeenCalledWith(returnGetUser.avatarKey);
    expect(awsUtils.generateSignedUrlS3).toHaveBeenCalledTimes(1);

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
    vi.spyOn(argon2Utils, 'createHashPassword').mockResolvedValue(hashPassword);
    vi.spyOn(Repository_User, 'createUser').mockResolvedValue(result);
    vi.spyOn(VerifyAcc_Service, 'generateAccountToken').mockResolvedValue(undefined);
    vi.spyOn(uuidUtils, 'generateUUIDv7').mockReturnValue(userIdMock);

    const { password, ...safeInput } = testInput;

    const dataCreate = {
      id: userIdMock,
      hashPassword,
      ...safeInput
    };
    const createdUser = await Service_User.createUser(testInput);

    expect(argon2Utils.createHashPassword).toHaveBeenCalledWith(testInput.password);
    expect(uuidUtils.generateUUIDv7).toHaveBeenCalledBefore(vi.mocked(Repository_User.createUser));

    expect(Repository_User.createUser).toHaveBeenCalledWith(dataCreate, userCreateSelect);
    expect(VerifyAcc_Service.generateAccountToken).toHaveBeenCalledWith(
      createdUser.id,
      createdUser.email
    );
    expect(VerifyAcc_Service.generateAccountToken).toHaveBeenCalledTimes(1);

    expect(createdUser).toEqual(result);
  });

  test('Should throw AppError if hash fails', async () => {
    const error = new AppError('Senha inválida', 400);
    vi.spyOn(argon2Utils, 'createHashPassword').mockRejectedValue(error);

    await expect(Service_User.createUser(testInput)).rejects.toBe(error);
  });
});

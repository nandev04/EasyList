import { AppError } from '../../shared/utils/error.js';
import * as cryptoUtils from '../../shared/utils/crypto.js';
import * as VerifyAcc_Service from '../auth/use-cases/verifyAccount/verifyAcc.service.js';
import * as Repository_User from './user.repository.js';
import * as Service_User from './user.service.js';
import { userCreateSelect, userPublicSelect } from './user.select.js';
import * as s3CommandsUtils from '../../shared/utils/S3ClientCommands.js';
import * as uuidUtils from '../../shared/utils/uuid.js';
import { GetObjectCommand } from '@aws-sdk/client-s3';

const userIdMock = uuidUtils.createUserId();
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
    vi.spyOn(s3CommandsUtils, 'getAvatarS3').mockResolvedValue(
      new GetObjectCommand({ Bucket: 'test', Key: 'test' })
    );
    vi.spyOn(s3CommandsUtils, 'generateSignedUrl').mockResolvedValue('signedUrlTest');

    await Service_User.getUser(userIdMock);

    expect(s3CommandsUtils.getAvatarS3).toHaveBeenCalledTimes(1);
    expect(s3CommandsUtils.getAvatarS3).toHaveBeenCalledWith(returnGetUser.avatarKey);
    expect(s3CommandsUtils.generateSignedUrl).toHaveBeenCalledTimes(1);

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
    vi.spyOn(cryptoUtils, 'createHashPassword').mockResolvedValue(hashPassword);
    vi.spyOn(Repository_User, 'createUser').mockResolvedValue(result);
    vi.spyOn(VerifyAcc_Service, 'generateAccountToken').mockResolvedValue(undefined);
    vi.spyOn(uuidUtils, 'createUserId').mockReturnValue(userIdMock);

    const { password, ...safeInput } = testInput;

    const dataCreate = {
      id: userIdMock,
      hashPassword,
      ...safeInput
    };
    const createdUser = await Service_User.createUser(testInput);

    expect(cryptoUtils.createHashPassword).toHaveBeenCalledWith(testInput.password);
    expect(uuidUtils.createUserId).toHaveBeenCalledBefore(vi.mocked(Repository_User.createUser));

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
    vi.spyOn(cryptoUtils, 'createHashPassword').mockRejectedValue(error);

    await expect(Service_User.createUser(testInput)).rejects.toBe(error);
  });
});

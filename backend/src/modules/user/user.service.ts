import { CreateUserBodySchemaType, updateUserSchemaBodyType } from './user.schema.js';
import * as Model_User from './user.model.js';
import { AppError } from '../../shared/utils/error.js';
import { createHashPassword } from '../../shared/utils/crypto.js';
import dotenv from 'dotenv';
import * as Service_Auth from '../auth/auth.service.js';
import processAvatarImage from '../../shared/utils/processAvatarImage.js';
import s3 from '../../lib/s3.js';
import { putAvatarS3, generateSignedUrl } from '../../shared/utils/S3ClientCommands.js';

dotenv.config();

const getUser = async (id: number) => {
  const user = await Model_User.getUser(id);
  return user;
};

const createUser = async ({ username, password, email }: CreateUserBodySchemaType) => {
  try {
    const hashPassword = await createHashPassword(password);

    const createdUser = await Model_User.createUser({ username, hashPassword, email });

    await Service_Auth.emailVerificationAccount(createdUser.id, createdUser.email);

    return createdUser;
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError(err instanceof Error ? err.message : 'Erro Desconhecido', 500);
  }
};

const updateUser = async (id: number, data: updateUserSchemaBodyType) => {
  return await Model_User.updateUser({ id, data });
};

const deleteUser = async (id: number) => {
  return await Model_User.deleteUser(id);
};

const uploadAvatar = async (userId: number, file: Express.Multer.File) => {
  const key = `avatars/users/${userId}/avatar.webp`;

  const processedImageBuffer = await processAvatarImage(file.buffer);

  const putCommand = await putAvatarS3(key, processedImageBuffer);

  await s3.send(putCommand);

  const signedUrl = await generateSignedUrl(key);

  await Model_User.insertAvatar(userId, key);

  return signedUrl;
};

export { getUser, createUser, updateUser, deleteUser, uploadAvatar };

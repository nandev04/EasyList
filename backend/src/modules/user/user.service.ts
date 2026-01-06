import { CreateUserBodySchemaType, updateUserSchemaBodyType } from './user.schema.js';
import * as Model_User from './user.model.js';
import { AppError } from '../../shared/utils/error.js';
import { createHashPassword } from '../../shared/utils/crypto.js';
import dotenv from 'dotenv';
import * as Service_Auth from '../auth/auth.service.js';
import processAvatarImage from '../../shared/utils/processAvatarImage.js';
import s3 from '../../lib/s3.js';
import generateSignedUrl from '../../shared/utils/getSignedUrlImage.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';

dotenv.config();

const getUser = async (id: string) => {
  const user = await Model_User.getUser(+id);
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

  const putCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Body: processedImageBuffer,
    ContentType: 'image/webp'
  });

  await s3.send(putCommand);

  const signedUrl = await generateSignedUrl(key);
  console.log(signedUrl);

  return signedUrl;
};

export { getUser, createUser, updateUser, deleteUser, uploadAvatar };

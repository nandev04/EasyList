import { CreateUserBodySchemaType, updateUserSchemaBodyType } from './user.schema.js';
import * as Repository_User from './user.repository.js';
import { AppError } from '../../shared/utils/error.js';
import { createHashPassword, tokenUUID, transformForHash } from '../../shared/utils/crypto.js';
import * as mailService from '../../shared/services/mail.service.js';
import dotenv from 'dotenv';
import * as Service_Auth from '../auth/auth.service.js';
import processAvatarImage from '../../shared/utils/processAvatarImage.js';
import {
  deleteAvatarS3,
  generateSignedUrl,
  getAvatarS3,
  putAvatarS3
} from '../../shared/utils/S3ClientCommands.js';
import generateCode from '../../shared/utils/generateCode.js';
import { userCreateSelect, userPublicSelect } from './user.select.js';
import s3Client from '../../lib/s3.js';
import { createUserId } from '../../shared/utils/uuid.js';

dotenv.config();

const getUser = async (userId: string) => {
  let signedUrl: string | null = null;
  const user = await Repository_User.getUser(userId, userPublicSelect);
  if (!user) throw new AppError('Usuário não encontrado', 404);
  const { avatarKey, ...safeUser } = user;
  if (user.avatarKey) {
    const getCommand = await getAvatarS3(user.avatarKey);
    signedUrl = await generateSignedUrl(getCommand);
  }

  return { safeUser, signedUrl };
};

const createUser = async (data: CreateUserBodySchemaType) => {
  try {
    const { password, ...safeData } = data;
    const hashPassword = await createHashPassword(password);

    const userId = createUserId();
    const newData = { id: userId, hashPassword, ...safeData };
    const createdUser = await Repository_User.createUser(newData, userCreateSelect);

    await Service_Auth.emailVerificationAccount(createdUser.id, createdUser.email);

    return createdUser;
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError(err instanceof Error ? err.message : 'Erro Desconhecido', 500);
  }
};

const updateUser = async (userId: string, data: updateUserSchemaBodyType) => {
  const { email, ...safeData } = data;
  if (email) {
    const code = generateCode();
    const tokenHash = transformForHash(code);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await Repository_User.createEmailCodeOTP({
      userId,
      tokenHash,
      new_email: email,
      expiresAt
    });
    mailService.sendOTPEmail(email, code);
  }

  await Repository_User.updateUser({ userId, data: safeData });

  return safeData;
};

const verifyOTPAndUpdateEmail = async (userId: string, code: string) => {
  const hashCode = transformForHash(code);
  const codeFound = await Repository_User.verifyOTPCodeUpdateEmail(userId, hashCode);

  const dateNow = new Date();
  if (!codeFound) throw new AppError('Código não encontrado', 404);
  if (codeFound.expiresAt < dateNow) throw new AppError('Código expirado', 400);
  if (codeFound.used) throw new AppError('Código utilizado', 400);

  const oldEmail = codeFound.user.email;

  await Repository_User.updateUser({ userId, data: { email: codeFound.new_email } });
  await Repository_User.markCodeAsUsed(codeFound.id);

  mailService.emailChangeNotice(oldEmail, codeFound.new_email, dateNow.toLocaleDateString());

  return codeFound.new_email;
};

const deleteUser = async (userId: string) => {
  return await Repository_User.deleteUser(userId);
};

const uploadAvatar = async (userId: string, file: Express.Multer.File) => {
  const timestamp = Date.now();
  const uniqueName = `${timestamp}-${tokenUUID()}.webp`;

  const newPath = `avatars/${uniqueName}.webp`;

  const processedImageBuffer = await processAvatarImage(file.buffer);

  const putCommand = await putAvatarS3(newPath, processedImageBuffer);
  await s3Client.send(putCommand);

  const getCommand = await getAvatarS3(newPath);
  const signedUrlGetAvatar = await generateSignedUrl(getCommand);

  const { avatarKey: oldPath } = (await Repository_User.getUser(userId, userPublicSelect)) as {
    avatarKey: string;
  };
  await Repository_User.updateAvatar(userId, newPath);

  const deleteCommand = await deleteAvatarS3(oldPath);

  await s3Client.send(deleteCommand);

  return signedUrlGetAvatar;
};

export { getUser, createUser, updateUser, verifyOTPAndUpdateEmail, deleteUser, uploadAvatar };

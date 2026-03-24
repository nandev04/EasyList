import { CreateUserBodySchemaType, updateUserSchemaBodyType } from './user.schema.js';
import * as Repository_User from './user.repository.js';
import { AppError } from '../../shared/utils/error.js';
import { createHashPassword, tokenUUID, transformForHash } from '../../shared/utils/crypto.js';
import * as mailService from '../../shared/services/mail.service.js';
import dotenv from 'dotenv';
import * as Service_Auth from '../auth/auth.service.js';
import processAvatarImage from '../../shared/utils/processAvatarImage.js';
import s3 from '../../lib/s3.js';
import { deleteAvatarS3, putAvatarS3 } from '../../shared/utils/S3ClientCommands.js';
import generateCode from '../../shared/utils/generateCode.js';
import { userCreateSelect, userPublicSelect } from './user.select.js';

dotenv.config();

const getUser = async (id: number) => {
  const user = await Repository_User.getUser(id, userPublicSelect);
  return user;
};

const createUser = async (data: CreateUserBodySchemaType) => {
  try {
    const { password, ...safeData } = data;
    const hashPassword = await createHashPassword(password);

    const newData = { hashPassword, ...safeData };
    const createdUser = await Repository_User.createUser(newData, userCreateSelect);

    await Service_Auth.emailVerificationAccount(createdUser.id, createdUser.email);

    return createdUser;
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError(err instanceof Error ? err.message : 'Erro Desconhecido', 500);
  }
};

const updateUser = async (id: number, data: updateUserSchemaBodyType) => {
  const { email, ...safeData } = data;
  if (email) {
    const code = generateCode();
    const tokenHash = transformForHash(code);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await Repository_User.createEmailCodeOTP({
      userId: id,
      tokenHash,
      new_email: email,
      expiresAt
    });
    mailService.sendOTPEmail(email, code);
  }

  await Repository_User.updateUser({ id, data: safeData });

  return safeData;
};

const verifyOTPAndUpdateEmail = async (userId: number, code: string) => {
  const hashCode = transformForHash(code);
  const codeFound = await Repository_User.verifyOTPCodeUpdateEmail(userId, hashCode);

  const dateNow = new Date();
  if (!codeFound) throw new AppError('Código não encontrado', 404);
  if (codeFound.expiresAt < dateNow) throw new AppError('Código expirado', 400);
  if (codeFound.used) throw new AppError('Código utilizado', 400);

  const oldEmail = codeFound.user.email;

  await Repository_User.updateUser({ id: userId, data: { email: codeFound.new_email } });
  await Repository_User.markCodeAsUsed(codeFound.id);

  mailService.emailChangeNotice(oldEmail, codeFound.new_email, dateNow.toLocaleDateString());

  return codeFound.new_email;
};

const deleteUser = async (id: number) => {
  return await Repository_User.deleteUser(id);
};

const uploadAvatar = async (userId: number, file: Express.Multer.File) => {
  const uuid = tokenUUID();

  const newKey = `/avatars/${userId}/${uuid}.webp`;

  const processedImageBuffer = await processAvatarImage(file.buffer);

  const putCommand = await putAvatarS3(newKey, processedImageBuffer);

  await s3.send(putCommand);

  await Repository_User.updateAvatar(userId, newKey);

  const { avatarKey: oldKey } = (await Repository_User.getUser(userId, userPublicSelect)) as {
    avatarKey: string;
  };

  const deleteCommand = await deleteAvatarS3(oldKey);

  await s3.send(deleteCommand);

  return process.env.S3_URL_AVATARS + newKey;
};

export { getUser, createUser, updateUser, verifyOTPAndUpdateEmail, deleteUser, uploadAvatar };

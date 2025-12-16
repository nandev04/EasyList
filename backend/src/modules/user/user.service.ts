import bcrypt from 'bcrypt';
import { usersType } from '../typesAndInterfaces/users.js';
import * as Model from '../models/userModel.js';
import * as ModelDevice from '../models/DeviceModel.js';
import { AuthService } from './authService.js';
import { AppError } from '../utils/error.js';
import { createHashPassword } from '../utils/crypto.js';
import { updateUserSchemaBodyType } from '../schemas/users/updateUser.schema.js';
import dotenv from 'dotenv';

dotenv.config();

const getUser = async (id: string) => {
  const user = await Model.getUser(+id);
  return user;
};

const createUser = async ({ username, password, email }: usersType) => {
  try {
    const hashPassword = await createHashPassword(password);

    const createdUser = await Model.createUser({ username, hashPassword, email });

    await AuthService.register(createdUser.id, createdUser.email);

    return createdUser;
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError(err instanceof Error ? err.message : 'Erro Desconhecido', 500);
  }
};

const updateUser = async (id: number, data: updateUserSchemaBodyType) => {
  return await Model.updateUser({ id, data });
};

const deleteUser = async (id: number) => {
  return await Model.deleteUser(id);
};

// const loginUser = async (email: string, password: string) => {
//   const user = await Model.findByEmail(email);
//   const verifyHash = await bcrypt.compare(password, user.password);

//   if (!verifyHash) throw new AppError('Credenciais inválidas', 401);

//   const { accessToken, refreshTokenRaw, expiresMs, deviceUUID, expirationDate, hashRefreshToken } =
//     await AuthService.createTokens(user.id);

//   const maxDevicePerUser = Number(process.env.MAX_DEVICES_PER_USER);
//   const { id } = await ModelDevice.createDevice({ deviceUUID, userId: user.id, maxDevicePerUser });
//   await Model.createRefreshToken({
//     hashRefreshToken,
//     userId: user.id,
//     deviceId: id,
//     expiresAt: expirationDate
//   });

  return { accessToken, refreshTokenRaw, deviceUUID, expiresMs };
};

export { getUser, createUser, updateUser, deleteUser, loginUser };

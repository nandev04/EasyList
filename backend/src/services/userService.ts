import bcrypt from 'bcrypt';
import { usersType } from '../typesAndInterfaces/users.js';
import * as Model from '../models/userModel.js';
import { AuthService } from './authService.js';
import { AppError } from '../utils/error.js';
import { createHashPassword } from '../utils/crypto.js';
import { editUserSchemaBodyType } from '../schemas/users/editUser.schema.js';

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

const editUser = async (id: number, data: editUserSchemaBodyType) => {
  return await Model.editUser({ id, data });
};

const deleteUser = async (id: string) => {
  const deletedUser = await Model.deleteUser(+id);
  return deletedUser;
};

const loginUser = async (email: string, password: string) => {
  const user = await Model.findByEmail(email);
  const verifyHash = await bcrypt.compare(password, user.password);

  if (!verifyHash) throw new AppError('Credenciais inválidas', 401);

  const { accessToken, refreshTokenRaw, expiresMs, deviceId } = await AuthService.createTokens(
    user.id
  );

  return { accessToken, refreshTokenRaw, deviceId, expiresMs };
};

export { getUser, createUser, editUser, deleteUser, loginUser };

import { CreateUserBodySchemaType, updateUserSchemaBodyType } from './user.schema.js';
import * as Model_User from './user.model.js';
import { AppError } from '../../shared/utils/error.js';
import { createHashPassword } from '../../shared/utils/crypto.js';
import dotenv from 'dotenv';
import * as Service_Auth from '../auth/auth.service.js';

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

export { getUser, createUser, updateUser, deleteUser };

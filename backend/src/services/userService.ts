import { usersType } from '../types/users.js';
import * as Model from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { AuthService } from './authService.js';
import { AppError } from '../utils/error.js';

const getUser = async (id: string) => {
  const user = await Model.getUser(+id);
  return user;
};

const createUser = async ({ username, password, email }: usersType) => {
  try {
    // Preciso tratar os erros
    const hashPassword = await bcrypt.hash(password, 10);

    const createdUser = await Model.createUser({ username, hashPassword, email });

    const token = await AuthService.register(createdUser.id, createdUser.email);

    return createdUser;
  } catch (err) {
    if (err instanceof AppError) throw err;

    throw new AppError(err instanceof Error ? err.message : 'Erro Desconhecido', 500);
  }
};

const editUser = async ({ id, data }: { id: string; data: object }) => {
  const editedUser = await Model.editUser({ id: Number(id), data });

  return editedUser;
};

const deleteUser = async (id: string) => {
  const deletedUser = await Model.deleteUser(+id);
  return deletedUser;
};

export { getUser, createUser, editUser, deleteUser };

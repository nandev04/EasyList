import prisma from '../lib/prisma.js';
import { CreateUserType } from '../types/users.js';

const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
    select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
  });
  return user;
};

const createUser = async ({ username, hashPassword, email }: CreateUserType) => {
  const createdUser = await prisma.user.create({
    data: {
      name: username,
      password: hashPassword,
      email: email,
    },
  });
  return { id: createdUser.id, username: createdUser.name };
};

const editUser = async ({ id, data }: { id: number; data: {} }) => {
  const editedUser = await prisma.user.update({
    where: { id },
    data: { ...data },
    select: { id: true, name: true, updatedAt: true },
  });
  return editedUser;
};

const deleteUser = async (id: number) => {
  const deletedUser = await prisma.user.delete({
    where: { id },
    select: { id: true },
  });

  return deletedUser;
};

export { getUser, createUser, editUser, deleteUser };

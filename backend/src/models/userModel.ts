import prisma from '../lib/prisma.js';
import { CreateUserType } from '../types/users.js';

const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
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

export { getUser, createUser };

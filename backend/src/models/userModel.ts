import prisma from '../lib/prisma';
import { usersType } from '../types/usersInterface';

// PAREI AQUI
const getUserModel = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
  });
  return user;
};

const createUserModel = async ({ username, password, email }: usersType) => {
  const createdUser = await prisma.user.create({
    data: {
      name: username,
      password: password,
      email: email,
    },
  });
  return { id: createdUser.id, username: createdUser.name };
};

export { getUserModel, createUserModel };

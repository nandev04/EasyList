import { Prisma } from '@prisma/client';

export const userPublicSelect = {
  id: true,
  firstname: true,
  lastname: true,
  username: true,
  email: true,
  avatarKey: true,
  createdAt: true,
  updatedAt: true,
  verified: true
} satisfies Prisma.UserSelect;

export const userAuthSelect = {
  id: true,
  password: true
} satisfies Prisma.UserSelect;

export const userCreateSelect = {
  id: true,
  firstname: true,
  lastname: true,
  username: true,
  email: true,
  avatarKey: true
} satisfies Prisma.UserSelect;

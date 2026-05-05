import argon2 from 'argon2';

const createHashPassword = async (password: string) => await argon2.hash(password);

const compareHashPassword = async (password: string, hashPassword: string) =>
  await argon2.verify(hashPassword, password);

export { createHashPassword, compareHashPassword };

import prisma from '../lib/prisma.js';
const getUser = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: +id,
        },
    });
    return user;
};
const createUser = async ({ username, hashPassword, email }) => {
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

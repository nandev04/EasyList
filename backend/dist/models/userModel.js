import prisma from '../lib/prisma.js';
const getUser = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: +id,
        },
        select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
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
const editUser = async ({ id, data }) => {
    const editedUser = await prisma.user.update({
        where: { id },
        data: { ...data },
        select: { id: true, name: true, updatedAt: true },
    });
    return editedUser;
};
export { getUser, createUser, editUser };

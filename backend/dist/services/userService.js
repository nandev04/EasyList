import * as Model from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { AuthService } from './authService.js';
import { AppError } from '../utils/error.js';
const getUser = async (id) => {
    const user = await Model.getUser(+id);
    return user;
};
const createUser = async ({ username, password, email }) => {
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const createdUser = await Model.createUser({ username, hashPassword, email });
        await AuthService.register(createdUser.id, createdUser.email);
        return createdUser;
    }
    catch (err) {
        if (err instanceof AppError)
            throw err;
        throw new AppError(err instanceof Error ? err.message : 'Erro Desconhecido', 500);
    }
};
const editUser = async ({ id, data }) => {
    const editedUser = await Model.editUser({ id: Number(id), data });
    return editedUser;
};
const deleteUser = async (id) => {
    const deletedUser = await Model.deleteUser(+id);
    return deletedUser;
};
const loginUser = async (email, password) => {
    const user = await Model.findByEmail(email);
    const verifyHash = await bcrypt.compare(password, user.password);
    if (!verifyHash)
        throw new AppError('Credenciais inválidas', 401);
    const { accessToken, refreshToken } = await AuthService.createTokens(user.id);
    return { accessToken, refreshToken };
};
export { getUser, createUser, editUser, deleteUser, loginUser };

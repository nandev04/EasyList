import * as Model from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { AuthService } from './authService.js';
const getUser = async (id) => {
    const user = await Model.getUser(+id);
    return user;
};
const createUser = async ({ username, password, email }) => {
    // Preciso tratar os erros
    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await Model.createUser({ username, hashPassword, email });
    const token = await AuthService.register(createdUser.id, createdUser.email);
    return createdUser;
};
const editUser = async ({ id, data }) => {
    const editedUser = await Model.editUser({ id: Number(id), data });
    return editedUser;
};
const deleteUser = async (id) => {
    const deletedUser = await Model.deleteUser(+id);
    return deletedUser;
};
export { getUser, createUser, editUser, deleteUser };

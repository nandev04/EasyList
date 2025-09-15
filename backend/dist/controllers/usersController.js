import * as Service from '../services/userService.js';
const getUser = async (req, res) => {
    const { id } = req.body;
    const user = await Service.getUser(id);
    return res.status(200).json(user);
};
const createUser = async (req, res) => {
    const { username, password, email } = req.body;
    const createdUser = await Service.createUser({ username, password, email });
    return res.status(200).json(createdUser);
};
const editUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const editedUser = await Service.editUser({ id, data });
    return res.status(200).json(editedUser);
};
const deleteUser = async (req, res) => {
    const { id } = req.body;
    const deletedUser = await Service.deleteUser(id);
    return res.status(200).json(deletedUser);
};
export { getUser, createUser, editUser, deleteUser };

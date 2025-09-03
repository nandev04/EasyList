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
export { getUser, createUser };

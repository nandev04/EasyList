import { Request, Response } from 'express';
import * as Service from '../services/userService.js';
import { AppError } from '../utils/error.js';

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const user = await Service.getUser(id);
    return res.status(200).json(user);
  } catch (err: unknown) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });

    return res.status(500).json({ message: 'Erro desconhecido' });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    const createdUser = await Service.createUser({ username, password, email });

    return res.status(200).json(createdUser);
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });

    return res.status(500).json({ message: 'Erro desconhecido' });
  }
};

const editUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const editedUser = await Service.editUser({ id, data });

    return res.status(200).json(editedUser);
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });

    return res.status(500).json({ message: 'Erro desconhecido' });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const deletedUser = await Service.deleteUser(id);

    return res.status(200).json(deletedUser);
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });

    return res.status(500).json({ message: 'Erro desconhecido' });
  }
};

export { getUser, createUser, editUser, deleteUser };

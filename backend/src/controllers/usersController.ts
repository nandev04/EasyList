import { Request, Response } from 'express';
import * as Service from '../services/userService.js';
import { AppError } from '../utils/error.js';

const getUser = async (req: Request, res: Response) => {
  // Create User

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

// Login User

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { refreshToken, accessToken } = await Service.loginUser(email, password);

    // Refresh Token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      // no servidor (authService), o token expira em 7 dias, por isso transformei 7 dias em milisegundos
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Access Token
    return res.status(200).json({ token: accessToken });
  } catch (error) {
    if (error instanceof AppError) {
      console.log(error);
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro desconhecido' });
  }
};

export { getUser, createUser, editUser, deleteUser, loginUser };

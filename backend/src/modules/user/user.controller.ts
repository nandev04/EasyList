import { NextFunction, Request, Response } from 'express';
import * as Service from './user.service.js';

import dotenv from 'dotenv';
import { CreateUserBodySchemaType, updateUserSchemaBodyType } from './user.schema.js';
import cookieUser from '../../shared/constants/cookieUser.js';

dotenv.config();

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const user = await Service.getUser(id);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = <CreateUserBodySchemaType>req.validated!.body;

    await Service.createUser({ username, password, email });

    return res
      .status(201)
      .json({
        message:
          'Usuário criado com sucesso, verifique sua caixa de entrada para verificar sua conta'
      });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const data = req.validated!.body as updateUserSchemaBodyType;
    const editedUser = await Service.updateUser(userId, data);
    return res.status(200).json(editedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.userId!;

    await Service.deleteUser(id);

    res.clearCookie('deviceId', cookieUser);
    res.clearCookie('refreshToken', cookieUser);
    res.clearCookie('accessToken', cookieUser);

    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

export { getUser, createUser, updateUser, deleteUser };

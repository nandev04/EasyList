import { NextFunction, Request, Response } from 'express';
import * as Service from './user.service.js';

import dotenv from 'dotenv';
import {
  CreateUserBodySchemaType,
  updateUserSchemaBodyType,
  verifyOTPEmailChangeType
} from './user.schema.js';
import cookieUser from '../../shared/constants/cookieUser.js';

dotenv.config();

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.userId!;
    const data = await Service.getUser(id);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstname, lastname, username, password, email } = <CreateUserBodySchemaType>(
      req.validated!.body
    );

    await Service.createUser({ firstname, lastname, username, password, email });

    return res.status(201).json({
      message: 'Usuário criado com sucesso, verifique sua caixa de entrada para verificar sua conta'
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const data = <updateUserSchemaBodyType>req.validated!.body;
    const editedUser = await Service.updateUser(userId, data);
    return res.status(200).json(editedUser);
  } catch (err) {
    next(err);
  }
};

const verifyOTPAndUpdateEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const { code } = <verifyOTPEmailChangeType>req.validated!.body;
    await Service.verifyOTPAndUpdateEmail(userId, code);
    return res.status(200).json({ message: 'Email atualizado com sucesso' });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;

    await Service.deleteUser(userId);

    res.clearCookie('deviceId', cookieUser);
    res.clearCookie('refreshToken', cookieUser);
    res.clearCookie('accessToken', cookieUser);

    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;

    if (!req.file) return res.status(400).json({ message: 'Imagem não enviada' });

    const urlAvatar = await Service.uploadAvatar(userId, req.file);

    res.status(200).json({ urlAvatar });
  } catch (err) {
    next(err);
  }
};

export { getUser, createUser, updateUser, verifyOTPAndUpdateEmail, deleteUser, uploadAvatar };

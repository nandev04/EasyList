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
    const response = {
      ...data.safeUser,
      ...(data.signedUrl && { signedUrlAvatar: data.signedUrl })
    };
    return res.status(200).json(response);
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
    console.log(userId);
    const data = <updateUserSchemaBodyType>req.validated!.body;
    const updatedData = await Service.updateUser(userId, data);
    return res.status(200).json({
      success: true,
      message: 'Dados atualizados com sucesso',
      data: {
        ...updatedData
      }
    });
  } catch (err) {
    next(err);
  }
};

const verifyOTPAndUpdateEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const { code } = <verifyOTPEmailChangeType>req.validated!.body;
    const newEmail = await Service.verifyOTPAndUpdateEmail(userId, code);
    return res.status(200).json({
      success: true,
      message: 'Email atualizado com sucesso',
      data: {
        newEmail
      }
    });
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

    const signedUrl = await Service.uploadAvatar(userId, req.file);

    res.status(200).json({ signedUrl: signedUrl });
  } catch (err) {
    next(err);
  }
};

export { getUser, createUser, updateUser, verifyOTPAndUpdateEmail, deleteUser, uploadAvatar };

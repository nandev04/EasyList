import e, { NextFunction, Request, Response } from 'express';
import * as Service from '../services/userService.js';
import { AppError } from '../utils/error.js';

import ms from 'ms';
import dotenv from 'dotenv';

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
    const { username, password, email } = req.body;

    const createdUser = await Service.createUser({ username, password, email });

    return res.status(200).json(createdUser);
  } catch (err) {
    next(err);
  }
};

const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const editedUser = await Service.editUser({ id, data });

    return res.status(200).json(editedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;

    const deletedUser = await Service.deleteUser(id);

    return res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
};

// Login User

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const { refreshTokenRaw, accessToken, deviceId, expiresMs } = await Service.loginUser(
      email,
      password
    );

    const refreshTokenMaxAge = ms(process.env.TOKEN_REFRESH_EXPIRES_IN as ms.StringValue);
    const accessTokenMaxAge = ms(process.env.JWT_ACCESS_EXPIRES_IN as ms.StringValue);

    // DeviceID
    res.cookie('deviceId', deviceId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      signed: true,
      maxAge: expiresMs
    });

    // Refresh Token
    res.cookie('refreshToken', refreshTokenRaw, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      signed: true,
      maxAge: refreshTokenMaxAge
    });

    // Access Token
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      signed: true,
      maxAge: accessTokenMaxAge
    });
    return res.status(200).json({ token: accessToken });
  } catch (error) {
    next(error);
  }
};

export { getUser, createUser, editUser, deleteUser, loginUser };

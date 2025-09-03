import { Request, Response } from 'express';
import * as Service from '../services/userService.js';

const getUser = async (req: Request, res: Response) => {
  const { id } = req.body;
  const user = await Service.getUser(id);
  return res.status(200).json(user);
};

const createUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const createdUser = await Service.createUser({ username, password, email });

  return res.status(200).json(createdUser);
};

export { getUser, createUser };

import { Request, Response } from 'express';
import { getUserModel } from '../models/userModel';

const getUsersController = async (req: Request, res: Response) => {
  const { id } = req.body;
  const users = await getUserModel(id);
  res.status(200).json(users);
};

export { getUsersController };

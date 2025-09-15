import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

const verifyEmail = async (req: Request, res: Response) => {
  const token = req.query.token as string;

  if (!token) {
    res.status(400).json({ message: 'Token não fornecido!' });
  }

  const verifiedUser = await AuthService.verifyEmail(token);

  return res.status(200).json(verifiedUser);
};

export { verifyEmail };

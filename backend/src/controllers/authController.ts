import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

const verifyEmail = (req: Request, res: Response) => {
  const token = req.query.token as string;

  if (!token) {
    res.status(400).json({ message: 'Token não fornecido!' });
  }

  AuthService.verifyEmail(token);
};

export { verifyEmail };

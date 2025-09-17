import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';
import { AppError } from '../utils/error.js';

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;

    if (!token) {
      return res.status(400).json({ message: 'Token não fornecido!' });
    }

    const verifiedUser = await AuthService.verifyEmail(token);

    return res.status(200).json(verifiedUser);
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });

    return res
      .status(500)
      .json({ message: err instanceof Error ? err.message : 'Erro desconhecido' });
  }
};

export { verifyEmail };

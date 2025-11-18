import { Request, Response } from 'express';
import { AuthService, forgotPasswordService } from '../services/authService.js';
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

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email não fornecido' });
    }

    const r = await forgotPasswordService(email);
    return res.status(200).json(r);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const token = req.query.token;
  console.log('reset password route, token: ' + token);
  return res.status(200).json(token);

  // CRIAR ENDPOINT DE VALIDACAO DE TOKEN -> ALTERAR A SENHA DO USUÁRIO
};

export { verifyEmail, forgotPassword, resetPassword };

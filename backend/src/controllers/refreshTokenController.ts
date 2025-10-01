import { Request, Response } from 'express';
import * as Service from '../services/refreshTokenService.js';
import { AppError } from '../utils/error.js';

const refreshToken = async (req: Request, res: Response) => {
  // Construindo lógica de refreshToken router
  try {
    const token = req.signedCookies.refreshToken;
    if (!token) throw new AppError('Cookie refreshToken não encontrado', 400);
    console.log(token);
    res.status(200).json({ token });
    const newAccessToken = await Service.refreshToken(token);
    return newAccessToken;
  } catch (err) {
    if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });

    return res.status(500).json({ message: 'Erro desconhecido' });
  }
};

export { refreshToken };

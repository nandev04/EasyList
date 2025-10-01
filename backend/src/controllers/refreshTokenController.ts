import { Request, Response } from 'express';
import * as Service from '../services/refreshTokenService';

const refreshToken = async (req: Request, res: Response) => {
  // Construindo lógica de refreshToken router
  try {
    const token = req.cookies.refreshToken;
    const { userId } = await Service.refreshToken(token);
  } catch (error) {
    return;
  }
};

export { refreshToken };

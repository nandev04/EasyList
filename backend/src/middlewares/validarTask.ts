import { Request, Response, NextFunction } from 'express';

const validarTasks = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  if (!body.title) {
    return res.status(400).json({ message: 'O título não pode ser vazio' });
  }

  if (!body.description) {
    return res.status(400).json({ message: 'A descrição não pode ser vazia' });
  }

  next();
};

export default validarTasks;

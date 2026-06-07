import express, { Request, Response } from 'express';

const healthRoutes = express.Router();

healthRoutes.get('/ping', (_req: Request, res: Response) => res.sendStatus(204));

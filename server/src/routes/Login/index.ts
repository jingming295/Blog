// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { Login } from './performLogin';
import { LoginRequest as LR } from './interface';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) =>
{
  const login = new Login();
  const query: LR = req.query as { email: string, password: string; };
  const userResult = await login.performLogin(query);
  res.json(userResult);
});
export default router;

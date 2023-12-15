// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { Login } from './performLogin';
import { LoginRequest as LR } from './interface';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) =>
{
  const login = new Login();
  const body: LR = req.body as { email: string, password: string; };
  const userResult = await login.performLogin(body);
  res.json(userResult);
});
export default router;

// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { KeepLogin } from './performKeepLogin';
import { EncUserData, UserData } from '../../Return To Client/interface';

const router = express.Router();

router.post('/keeplogin', async (req: Request, res: Response) =>
{
  const keepLogin = new KeepLogin();
  console.log(req.body)
  const body  = req.body as unknown as { userData: UserData, encUserData: EncUserData; };
  const userResult = await keepLogin.performKeepLogin(body);
  res.json(userResult);
});
export default router;

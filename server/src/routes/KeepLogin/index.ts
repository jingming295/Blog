// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { KeepLogin } from './performKeepLogin';
import { LoginData as LD } from '../../Return To Client/interface';
const router = express.Router();

router.post('/keeplogin', async (req: Request, res: Response) =>
{
  const keepLogin = new KeepLogin();
  const body = req.body;
  // TODO fix this trash code
  const loginData = {
    ...body.UserData, encUserData: {
      ...body.UserData.encUserData, iv: Buffer.from(body.UserData.encUserData.iv.data), encryptedData: Buffer.from(body.UserData.encUserData.encryptedData.data), tag: Buffer.from(body.UserData.encUserData.tag.data)
    }
  } as LD;
  const userResult = await keepLogin.performKeepLogin(loginData);
  res.json(userResult);
});
export default router;

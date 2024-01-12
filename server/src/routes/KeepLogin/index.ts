// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { KeepLogin } from './performKeepLogin';
import { LoginData as LD, LoginDataFromClient } from '../../Return To Client/interface';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();
router.post('/keeplogin', async (req: Request, res: Response) =>
{
  try
  {
    const keepLogin = new KeepLogin();
    const body = req.body as { UserData: LoginDataFromClient; };
    if (body.UserData === undefined)
    {
      res.json({ code: -101, message: 'Data is not complete' });
      return;
    }
    const dataFromClient = new DataFromClient();
    const transformedUserData = dataFromClient.transformLoginDataFromUser(body);

    const userResult = await keepLogin.performKeepLogin(transformedUserData);
    res.json(userResult);
  } catch (error)
  {
    res.json({ code: -101, message: 'Error' });
    return;
  }

});
export default router;

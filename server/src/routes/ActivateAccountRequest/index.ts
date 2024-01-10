// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { ActivateAccountRequest } from './activateAccountRequest';

const router = express.Router();

router.post('/activateAccountRequest', async (req: Request, res: Response) =>
{
  try
  {
    
    const body = req.body as { token: string; };
    if (body.token === undefined)
    {
      res.json({ code: -101, message: 'Data is not complete' });
      return;
    }
    const activateAccountRequest = new ActivateAccountRequest;
    const result = await activateAccountRequest.performAction(body.token);
    res.json(result);
  } catch (error)
  {
    res.json({ code: -101, message: 'Error' });
    return;
  }

});
export default router;
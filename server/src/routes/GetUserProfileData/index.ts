// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { NormalRequestUserProfile } from './normalRequestUserProfile';

const router = express.Router();

router.post('/getUserProfileData', async (req: Request, res: Response) =>
{
  try
  {
    const normalRequestUserProfile = new NormalRequestUserProfile;
    const body = req.body as { id: string; };
    if (body.id === undefined)
    {
      res.json({ code: -101, message: 'Data is not complete' });
      return;
    }
    const userResult = await normalRequestUserProfile.requestUserProfile(body);
    res.json(userResult);
  } catch (error)
  {
    res.json({ code: -101, message: 'Error' });
    return;
  }

});
export default router;
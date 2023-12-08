// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { NormalRequestUserProfile } from './normalRequestUserProfile';

const router = express.Router();

router.post('/userprofile', async (req: Request, res: Response) =>
{
    const normalRequestUserProfile = new NormalRequestUserProfile;
    const body = req.body as { id: string };
    const userResult = await normalRequestUserProfile.requestUserProfile(body)
    res.json(userResult);
});
export default router;
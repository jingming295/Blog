// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { NormalRequestUserProfile } from './normalRequestUserProfile';

const router = express.Router();

router.post('/userprofile', async (req: Request, res: Response) =>
{
    const normalRequestUserProfile = new NormalRequestUserProfile;
    const query = req.query as { id: string };
    console.log(query)

    const userResult = await normalRequestUserProfile.requestUserProfile(query)
    res.json(userResult);
});
export default router;
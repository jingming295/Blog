// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { GetAllColorScheme } from './getAllColorScheme';
const router = express.Router();

router.post('/getAllColorScheme', async (req: Request, res: Response) =>
{
    try
    {
        const getAllColorScheme = new GetAllColorScheme();

        const returnData = await getAllColorScheme.performAction();
        res.json(returnData);

    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }



});
export default router;

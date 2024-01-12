// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { GetAllArticleBigArea } from './GetAllArticleBigArea';
const router = express.Router();

router.post('/getAllArticleBigArea', async (req: Request, res: Response) =>
{
    try
    {
        const getAllArticleBigArea = new GetAllArticleBigArea();

        const result = await getAllArticleBigArea.performAction();

        res.json(result);
        
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }



});
export default router;

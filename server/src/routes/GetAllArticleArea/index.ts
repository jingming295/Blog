// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { GetAllArticleArea } from './getAllArea';
const router = express.Router();

router.post('/getAllArticleArea', async (req: Request, res: Response) =>
{
    try
    {
        const getAllArticleArea = new GetAllArticleArea();

        const result = await getAllArticleArea.performAction();

        res.json(result);
        
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }



});
export default router;

// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { GetArticleCardData } from './GetArticleCardData';
const router = express.Router();

router.post('/getArticleCardData', async (req: Request, res: Response) =>
{
    const getArticleCardData = new GetArticleCardData();

    const returnData = await getArticleCardData.getArticleCardData();
  
    res.json(returnData);
});
export default router;

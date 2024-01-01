// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { GetArticleContent } from './GetArticleDataByKeyword';
const router = express.Router();

router.post('/getArticleDataByKeyword', async (req: Request, res: Response) =>
{
    const keyword = req.body.keyword;
    const getArticleContent = new GetArticleContent();
    const returnData = await getArticleContent.getArticleContentByKeyword(keyword);
    res.json(returnData);
});
export default router;

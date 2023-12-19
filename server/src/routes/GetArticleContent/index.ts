// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { GetArticleContent } from './GetArticleContent';
const router = express.Router();

router.post('/getArticleContent', async (req: Request, res: Response) =>
{
    const id = req.body.articleId;
    const getArticleContent = new GetArticleContent();

    const returnData = await getArticleContent.getArticleContent(id)
    res.json(returnData);
});
export default router;

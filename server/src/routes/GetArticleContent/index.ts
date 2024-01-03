// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { GetArticleContent } from './GetArticleContent';
const router = express.Router();

router.post('/getArticleContent', async (req: Request, res: Response) =>
{
    try {
        const id = req.body.articleId;
        const getArticleContent = new GetArticleContent();
        const returnData = await getArticleContent.getArticleContent(id)
        res.json(returnData);
    } catch (error) {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});
export default router;

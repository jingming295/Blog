// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { GetArticleContent } from './GetArticleDataByArea';
const router = express.Router();

router.post('/getArticleDataByArea', async (req: Request, res: Response) =>
{
    const area = req.body.area;
    const getArticleContent = new GetArticleContent();
    const returnData = await getArticleContent.getArticleContentByArea(area);
    res.json(returnData);
});
export default router;

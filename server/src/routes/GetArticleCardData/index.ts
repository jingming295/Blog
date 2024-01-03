// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { GetArticleCardData } from './GetArticleCardData';
const router = express.Router();

router.post('/getArticleCardData', async (req: Request, res: Response) =>
{
    try
    {
        const getArticleCardData = new GetArticleCardData();
        const body = req.body;
        if (body.area)
        {
            const area = body.area as string;
            const returnData = await getArticleCardData.getArticleContentByArea(area);
            res.json(returnData);
            return;
        } else if (body.keyword)
        {
            const keyword = body.keyword as string;
            const returnData = await getArticleCardData.getArticleContentByKeyword(keyword);
            res.json(returnData);
            return;
        } else
        {

            const returnData = await getArticleCardData.getArticleCardData();
            res.json(returnData);
            return;
        }
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }



});
export default router;

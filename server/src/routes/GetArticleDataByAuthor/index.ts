// src/routes/Login/index.ts
import express, { Request, Response } from 'express';
import { GetArticleDataByAuthor } from './GetArticleDataByAuthor';
const router = express.Router();


router.post('/getArticleDataByAuthor', async (req: Request, res: Response) =>
{
    try {
        const body = req.body as { UserID: number};
        if (body.UserID === undefined)
        {
          res.json({ code: -101, message: 'Data is not complete' });
          return;
        }
        
    
        const getArticleDataByAuthor = new GetArticleDataByAuthor();
        const returnData = await getArticleDataByAuthor.getArticleDataByAuthor(body.UserID)
        res.json(returnData);
    } catch (error) {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});
export default router;

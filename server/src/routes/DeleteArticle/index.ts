// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginData as LD, LoginDataFromClient } from '../../Return To Client/interface';
import { DeleteArticle } from './performDeleteArticle';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();


router.post('/deleteArticle', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, articleID: number; };
        if (body.UserData === undefined || body.articleID === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }

        const deleteArticle = new DeleteArticle();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
        const data = { UserData: transformedUserData, ArticleId: body.articleID };
        const returndata = await deleteArticle.performDeleteArticle(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
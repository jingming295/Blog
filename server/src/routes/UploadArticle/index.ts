// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginDataFromClient } from '../../Return To Client/interface';
import { UploadArticle } from './performUploadArticle';
import { ArticleData as AD } from './interface';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();

router.post('/uploadArticle', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, ArticleData: AD; };
        if (body.UserData === undefined || body.ArticleData === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }
        const uploadArticle = new UploadArticle();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
        const data = { UserData: transformedUserData, ArticleData: body.ArticleData };
        const returndata = await uploadArticle.performUploadArticle(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
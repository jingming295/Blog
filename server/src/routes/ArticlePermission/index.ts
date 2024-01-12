// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginDataFromClient } from '../../Return To Client/interface';
import { ArticlePermission } from './articlePermission';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();


router.post('/articlePermission', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, ArticleID: number; };
        if (body.UserData === undefined || body.ArticleID === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }
        const articlePermission = new ArticlePermission();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
        const data = { UserData: transformedUserData, ArticleID: body.ArticleID };
        const returndata = await articlePermission.checkArticlePermission(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
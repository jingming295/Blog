// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginData as LD } from '../../Return To Client/interface';
import { UploadArticle } from './performUploadArticle';
import { ArticleData as AD } from './interface';
const router = express.Router();

function transformUserData(body: { UserData:any; ArticleData?: AD; }): LD
{
    return {
        ...body.UserData,
        encUserData: {
            ...body.UserData.encUserData,
            iv: Buffer.from(body.UserData.encUserData.iv.data),
            encryptedData: Buffer.from(body.UserData.encUserData.encryptedData.data),
            tag: Buffer.from(body.UserData.encUserData.tag.data)
        }
    } as LD;
}

router.post('/uploadArticle', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LD, ArticleData: AD; };
        if (body.UserData === undefined || body.ArticleData === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }
        const uploadArticle = new UploadArticle();
        const transformedUserData = transformUserData(body);
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
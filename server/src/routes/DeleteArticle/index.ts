// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginData as LD } from '../../Return To Client/interface';
import { DeleteArticle } from './performDeleteArticle';
const router = express.Router();

function transformUserData(body: any): LD
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

router.post('/deleteArticle', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LD, articleID: number; };
        if (body.UserData === undefined || body.articleID === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }

        const deleteArticle = new DeleteArticle();
        const transformedUserData = transformUserData(body);
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
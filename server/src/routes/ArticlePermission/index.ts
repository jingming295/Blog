// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginData as LD } from '../../Return To Client/interface';
import { ArticlePermission } from './articlePermission';
const router = express.Router();

function transformUserData(body: any): LD {
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

router.post('/articlePermission', async (req: Request, res: Response) => {
    const body = req.body as { UserData: LD, ArticleID: number };
    if (body.UserData === undefined || body.ArticleID === undefined) {
        res.json({ code: -101, message: 'Data is not complete' });
        return;
    }
    const articlePermission = new ArticlePermission();
    const transformedUserData = transformUserData(body);
    const data = {UserData: transformedUserData, ArticleID: body.ArticleID};
    const returndata = await articlePermission.checkArticlePermission(data)
    res.json(returndata);
});

export default router;
// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginData as LD } from '../../Return To Client/interface';
import { AddColorScheme } from './addColorScheme';
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

router.post('/addColorScheme', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LD, textColor: string, backgroundColor: string };
        if (body.UserData === undefined || body.textColor === undefined || body.backgroundColor === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }

        const addColorScheme = new AddColorScheme();
        const transformedUserData = transformUserData(body);
        const data = { UserData: transformedUserData, textColor: body.textColor, backgroundColor: body.backgroundColor };
        const returndata = await addColorScheme.performAction(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
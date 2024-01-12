// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginData as LD } from '../../Return To Client/interface';
import { DeleteColorScheme } from './deleteColorScheme';
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

router.post('/deleteColorScheme', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LD, id: number; };
        if (body.UserData === undefined || body.id === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }

        const deleteColorScheme = new DeleteColorScheme();
        const transformedUserData = transformUserData(body);
        const data = { UserData: transformedUserData, id: body.id };
        const returndata = await deleteColorScheme.performAction(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
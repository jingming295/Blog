// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginData as LD } from '../../Return To Client/interface';
import { UpdateEmailSettings } from './updateEmailSettings';
import { setting_emailFromUser } from './interface';
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

router.post('/updateEmailSettings', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LD, setting: setting_emailFromUser; };
        if (body.UserData === undefined || body.setting === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }
        const updateEmailSettings = new UpdateEmailSettings();
        const transformedUserData = transformUserData(body);
        const data = { UserData: transformedUserData, settings: body.setting };
        const returndata = await updateEmailSettings.performAction(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
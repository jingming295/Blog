// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginDataFromClient } from '../../Return To Client/interface';
import { UpdateEmailSettings } from './updateEmailSettings';
import { setting_emailFromUser } from './interface';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();


router.post('/updateEmailSettings', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, setting: setting_emailFromUser; };
        if (body.UserData === undefined || body.setting === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }
        const updateEmailSettings = new UpdateEmailSettings();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
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
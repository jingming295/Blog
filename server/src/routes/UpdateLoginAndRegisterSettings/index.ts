// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginDataFromClient } from '../../Return To Client/interface';
import { UpdateLoginAndRegisterSettings } from './updateLoginAndRegisterSettings';
import { setting_loginandregisterFromUser } from './interface';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();

router.post('/updateLoginAndRegisterSettings', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, setting: setting_loginandregisterFromUser; };
        if (body.UserData === undefined || body.setting === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }
        const updateLoginAndRegisterSettings = new UpdateLoginAndRegisterSettings();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
        const data = { UserData: transformedUserData, settings: body.setting };
        const returndata = await updateLoginAndRegisterSettings.performUpdateLoginAndRegisterSettings(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
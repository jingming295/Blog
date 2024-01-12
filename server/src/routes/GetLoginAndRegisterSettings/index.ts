// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginDataFromClient } from '../../Return To Client/interface';
import { GetLoginAndRegisterSettings } from './getLoginAndRegisterSettings';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();


router.post('/getLoginAndRegisterSettings', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient};
        if (body.UserData === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }

        const getLoginAndRegisterSettings = new GetLoginAndRegisterSettings();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
        const returndata = await getLoginAndRegisterSettings.performAction(transformedUserData);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginDataFromClient } from '../../Return To Client/interface';
import { SendTestEmail } from './sendTestEmail';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();
router.post('/sendTestEmail', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, testEmailAddress: string; };
        if (body.UserData === undefined || body.testEmailAddress === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }
        const sendTestEmail = new SendTestEmail();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
        const data = { UserData: transformedUserData, TestEmailAddress: body.testEmailAddress};
        const returndata = await sendTestEmail.performAction(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
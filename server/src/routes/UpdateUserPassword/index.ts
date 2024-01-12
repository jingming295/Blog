// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginDataFromClient } from '../../Return To Client/interface';
import { UpdateUserPassword } from './updateUserPassword';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();


router.post('/updateUserPassword', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, newPassword:string};
        if (body.UserData === undefined || body.newPassword === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }
        const updateUserPassword = new UpdateUserPassword();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
        const data = { UserData: transformedUserData, newPassword: body.newPassword};
        const returndata = await updateUserPassword.performUpdateUserPassword(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
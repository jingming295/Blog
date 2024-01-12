// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginData as LD, LoginDataFromClient } from '../../Return To Client/interface';
import { DeleteColorScheme } from './deleteColorScheme';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();

router.post('/deleteColorScheme', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, id: number; };
        if (body.UserData === undefined || body.id === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }

        const deleteColorScheme = new DeleteColorScheme();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
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
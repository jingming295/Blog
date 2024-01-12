// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginData as LD, LoginDataFromClient } from '../../Return To Client/interface';
import { AddColorScheme } from './addColorScheme';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();



router.post('/addColorScheme', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, textColor: string, backgroundColor: string };
        if (body.UserData === undefined || body.textColor === undefined || body.backgroundColor === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }

        const addColorScheme = new AddColorScheme();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
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
// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginDataFromClient } from '../../Return To Client/interface';
import { AddBigArea } from './addBigArea';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();

router.post('/addBigArea', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, name: string };
        if (body.UserData === undefined || body.name === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }

        const addBigArea = new AddBigArea();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
        const data = { UserData: transformedUserData, bigArea: body.name};
        const returndata = await addBigArea.performAction(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
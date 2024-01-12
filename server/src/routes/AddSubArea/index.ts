// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginDataFromClient } from '../../Return To Client/interface';
import { AddSubArea } from './addSubArea';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();


router.post('/addSubArea', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, name: string, bigAreaID: number, colorSchemeID: number };
        if (body.UserData === undefined || body.name === undefined || body.bigAreaID === undefined || body.colorSchemeID === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }

        const addSubArea = new AddSubArea();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
        const data = { UserData: transformedUserData, name: body.name, bigAreaID: body.bigAreaID, colorSchemeID: body.colorSchemeID};
        const returndata = await addSubArea.performAction(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
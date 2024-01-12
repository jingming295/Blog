// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginDataFromClient } from '../../Return To Client/interface';
import { UpdateBigArea } from './updateBigArea';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();

router.post('/updateBigArea', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, id:number, name:string; };
        if (body.UserData === undefined || body.id === undefined || body.name === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }
        const updateBigArea = new UpdateBigArea();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
        const data = { UserData: transformedUserData, id: body.id, name: body.name };
        const returndata = await updateBigArea.performAction(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
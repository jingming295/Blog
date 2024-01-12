// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginDataFromClient } from '../../Return To Client/interface';
import { DeleteSubArea } from './deleteSubArea';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();

router.post('/deleteSubArea', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, id: number; };
        if (body.UserData === undefined || body.id === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }

        const deleteSubArea = new DeleteSubArea();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
        const data = { UserData: transformedUserData, id: body.id };
        const returndata = await deleteSubArea.performAction(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
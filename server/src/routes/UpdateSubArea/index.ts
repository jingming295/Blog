// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginDataFromClient } from '../../Return To Client/interface';
import { UpdateSubArea } from './updateSubArea';
import { DataFromClient } from '../../Data From Client';
const router = express.Router();

router.post('/updateSubArea', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LoginDataFromClient, id:number, name:string, bigAreaID:number, colorSchemeID:number };
        console.log(body);
        if (body.UserData === undefined || body.id === undefined || body.name === undefined || body.bigAreaID === undefined || body.colorSchemeID === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }
        const updateSubArea = new UpdateSubArea();
        const dataFromClient = new DataFromClient();
        const transformedUserData = dataFromClient.transformLoginDataFromUser(body);
        const data = { UserData: transformedUserData, id: body.id, name: body.name, bigAreaID: body.bigAreaID, colorSchemeID: body.colorSchemeID };
        const returndata = await updateSubArea.performAction(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
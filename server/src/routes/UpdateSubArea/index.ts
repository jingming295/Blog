// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginData as LD } from '../../Return To Client/interface';
import { UpdateSubArea } from './updateSubArea';
const router = express.Router();

function transformUserData(body: any): LD
{
    return {
        ...body.UserData,
        encUserData: {
            ...body.UserData.encUserData,
            iv: Buffer.from(body.UserData.encUserData.iv.data),
            encryptedData: Buffer.from(body.UserData.encUserData.encryptedData.data),
            tag: Buffer.from(body.UserData.encUserData.tag.data)
        }
    } as LD;
}

router.post('/updateSubArea', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LD, id:number, name:string, bigAreaID:number, colorSchemeID:number };
        console.log(body);
        if (body.UserData === undefined || body.id === undefined || body.name === undefined || body.bigAreaID === undefined || body.colorSchemeID === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }
        const updateSubArea = new UpdateSubArea();
        const transformedUserData = transformUserData(body);
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
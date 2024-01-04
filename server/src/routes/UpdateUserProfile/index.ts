// src/routes/Register/index.ts
import express, { Request, Response } from 'express';
import { LoginData as LD } from '../../Return To Client/interface';
import { UpdateUserProfile } from './updateUserProfile';
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

router.post('/updateUserProfile', async (req: Request, res: Response) =>
{
    try
    {
        const body = req.body as { UserData: LD, newUsername:string, newGender:number, newDescription:string };
        if (body.UserData === undefined || body.newUsername === undefined || body.newGender === undefined || body.newDescription === undefined)
        {
            res.json({ code: -101, message: 'Data is not complete' });
            return;
        }
        if(body.newGender<0 || body.newGender>=3){
            res.json({code: -102, message: 'Invalid input'})
            return
        }
        const updateUserProfile = new UpdateUserProfile();
        const transformedUserData = transformUserData(body);
        const data = { UserData: transformedUserData, newUsername: body.newUsername, newGender: body.newGender, newDescription: body.newDescription };
        const returndata = await updateUserProfile.performUpdateUserProfile(data);
        res.json(returndata);
    } catch (error)
    {
        res.json({ code: -101, message: 'Error' });
        return;
    }

});

export default router;
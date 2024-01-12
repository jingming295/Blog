import { LoginDataFromClient } from "../Return To Client/interface";
import { LoginData as LD } from "../Return To Client/interface";

export class DataFromClient
{
    transformLoginDataFromUser(body: { UserData: LoginDataFromClient; }): LD
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
}
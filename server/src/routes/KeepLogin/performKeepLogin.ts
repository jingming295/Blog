import { LoginData as LD } from "../../Return To Client/interface";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { ReturnData } from "../../Return To Client";
import { UserData as UD } from "../../Return To Client/interface";

export class KeepLogin
{
    private returnData: ReturnData;

    constructor()
    {
        this.returnData = new ReturnData();
    }
    performKeepLogin(loginData: LD)
    {
        try
        {
            const decUserData: UD = this.decryptUserData(loginData.encUserData, loginData.userData.id.toString());
            const userData: UD = loginData.userData;
            if (JSON.stringify(decUserData) === JSON.stringify(userData))
            {
                const returnData = this.returnData.returnClientData(0, 'sucessful');
                return returnData;
            } else
            {
                const returnData = this.returnData.returnClientData(-101, 'User data not match');
                return returnData;
            }
        } catch (error)
        {
            // invalid iv
            if (error instanceof Error && error.message.includes('Unsupported state or unable to authenticate data'))
            {
                const returnData = this.returnData.returnClientData(-102, 'Invalid IV or Auth Tag');
                return returnData;
            } else
            {
                const returnData = this.returnData.returnClientData(-400, 'Error');
                console.log(error);
                return returnData;
            }
        }

    }

    decryptUserData(encUserData: AES_256_GCMEncrypted, key: string)
    {
        const aes_256_GCM = new AES_256_GCM();
        const decUserData: UD = JSON.parse(aes_256_GCM.decrypt(encUserData.encryptedData, encUserData.iv, encUserData.tag, key));
        return decUserData;
    }
}
import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { SHA256 } from "../../Crypto/sha256";
import { ReturnData } from "../../Return To Client";
import { LoginData as LD, UserData as UD } from "../../Return To Client/interface";
import { DBUpdate } from "../../SQL/dbUpdate";

export class UpdateUserPassword{
    returnData = new ReturnData();
    
    async performUpdateUserPassword(data:{UserData:LD, newPassword:string}){
        try
        {
            const decUserData: UD = this.decryptUserData(data.UserData.encUserData, data.UserData.userData.id.toString());
            const userData: UD = data.UserData.userData;
            if (JSON.stringify(decUserData) === JSON.stringify(userData))
            {
                const dbUpdate = new DBUpdate();
                const sha256 = new SHA256();
                const hashedPassword = await sha256.hashPassword(data.newPassword);
                const ResultSetHeader = await dbUpdate.updateUserPassword(userData.id, hashedPassword);

                if (ResultSetHeader.affectedRows === 1)
                {
                    const returnData = this.returnData.returnClientData(0, 'Update password sucessful');
                    return returnData;
                } else
                {
                    const returnData = this.returnData.returnClientData(-101, 'User data not match');
                    return returnData;
                }
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
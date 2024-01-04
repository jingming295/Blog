import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { ReturnData } from "../../Return To Client";
import { LoginData as LD, UserData as UD } from "../../Return To Client/interface";
import { DBSelect } from "../../SQL/dbSelect";
import { DBUpdate } from "../../SQL/dbUpdate";

export class UpdateUserProfile{
    returnData = new ReturnData();
    
    async performUpdateUserProfile(data:{UserData:LD, newUsername:string, newGender:number, newDescription:string}){
        try
        {
            const decUserData: UD = this.decryptUserData(data.UserData.encUserData, data.UserData.userData.id.toString());
            const userData: UD = data.UserData.userData;
            if (JSON.stringify(decUserData) === JSON.stringify(userData))
            {
                const dbUpdate = new DBUpdate();
                const ResultSetHeader = await dbUpdate.updateUserProfile(userData.id, data.newUsername, data.newGender, data.newDescription);
                if (ResultSetHeader.affectedRows === 1)
                {
                    const UserData = await this.generateUserData(userData.id);
                    const returnData = this.returnData.returnClientData(0, 'Update basic user information sucessful', UserData);
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

    private async generateUserData(userID:number){
        const aes_256_GCM = new AES_256_GCM();
        const dbSelect = new DBSelect();
        const userResult = await dbSelect.selectUserProfile(userID);
        const userData: UD = {
            id: userResult[0].u_id,
            name: userResult[0].u_name,
            email: userResult[0].u_email,
            class: userResult[0].u_class,
            gender: userResult[0].u_gender,
            userDesc: userResult[0].u_desc,
            avatar: userResult[0].avatar_name
        }
        const encryptedData = aes_256_GCM.encrypt(JSON.stringify(userData), userID.toString());
        const loginData:LD = {
            userData:userData,
            encUserData:encryptedData
        }
        return loginData;
    }
}
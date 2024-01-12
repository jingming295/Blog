import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { ReturnData } from "../../Return To Client";
import { LoginData as LD, UserData as UD } from "../../Return To Client/interface";
import { DBSelect } from "../../SQL/dbSelect";
import { DBUpdate } from "../../SQL/dbUpdate";

export class DeleteColorScheme{
    returnData = new ReturnData();
    async performAction(data : {UserData: LD, id: number;}){
        try
        {
            const decUserData: UD = this.decryptUserData(data.UserData.encUserData, data.UserData.userData.id.toString());
            const userData: UD = data.UserData.userData;

            if (JSON.stringify(decUserData) === JSON.stringify(userData) && userData.class === 3)
            {
                const dbSelect = new DBSelect();

                const dbUpdate = new DBUpdate();

                const ColorScheme = await dbSelect.checkColorSchemeConstraint(data.id);
                if(ColorScheme.length > 0){
                    const returnData = this.returnData.returnClientData(-101, 'You can not delete this color scheme because it is used in some articles');
                    return returnData;
                }

                const result = await dbUpdate.deleteColorScheme(data.id);

                if (result.affectedRows === 1)
                {
                    const returnData = this.returnData.returnClientData(0, 'Delete success');
                    return returnData;
                } else
                {
                    const returnData = this.returnData.returnClientData(-101, 'Delete failed');
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
import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { ReturnData } from "../../Return To Client";
import { LoginData as LD, UserData as UD } from "../../Return To Client/interface";
import { DBSelect } from "../../SQL/dbSelect";
import { DBUpdate } from "../../SQL/dbUpdate";

export class DeleteSubArea{
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

                const subArea = await dbSelect.selectSubAreaByID(data.id);

                const constrait = await dbSelect.checkSubAreaConstraint(data.id);
                if(constrait.length !== 0){
                    const returnData = this.returnData.returnClientData(-101, 'You cannot delete this sub area because it is used by some articles');
                    return returnData;
                }

                if(subArea.length === 0)
                {
                    const returnData = this.returnData.returnClientData(-101, 'Data not found');
                    return returnData;
                }

                const result = await dbUpdate.deleteSubArea(data.id);

                if(result.affectedRows === 1)
                {
                    const returnData = this.returnData.returnClientData(0, 'Success');
                    return returnData;
                } else 
                {
                    const returnData = this.returnData.returnClientData(-101, 'Data not found');
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
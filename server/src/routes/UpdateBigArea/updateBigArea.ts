import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { ReturnData } from "../../Return To Client";
import { LoginData as LD, ReturnClientData, UserData as UD } from "../../Return To Client/interface";
import { DBSelect } from "../../SQL/dbSelect";
import { DBUpdate } from "../../SQL/dbUpdate";
import { InputControl, ValidationError } from "../../Validators/inputControl";
export class UpdateBigArea{
    
    private returnData = new ReturnData();

    async performAction(data: { UserData: LD, id: number, name:string }): Promise<ReturnClientData>
    {
        try
        {
            const decUserData: UD = this.decryptUserData(data.UserData.encUserData, data.UserData.userData.id.toString());
            const userData: UD = data.UserData.userData;
            if (JSON.stringify(decUserData) === JSON.stringify(userData) && userData.class === 3)
            {
                this.validation( data.id, data.name);
                const dbSelect = new DBSelect();
                const bigArea = await dbSelect.selectBigAreaByID(data.id);
                if (bigArea.length === 0)
                {
                    const returnData = this.returnData.returnClientData(-101, 'Big area not exist');
                    return returnData;
                }
                const dbUpdate = new DBUpdate();
                const ResultSetHeader = await dbUpdate.updateBigArea(data.id, data.name);
                if (ResultSetHeader.affectedRows === 1)
                {
                    const returnData = this.returnData.returnClientData(0, 'Success');
                    return returnData;
                } else
                {
                    const returnData = this.returnData.returnClientData(-101, 'Update failed');
                    return returnData;
                }

            } else
            {
                const returnData = this.returnData.returnClientData(-101, 'User data not match');
                return returnData;
            }


        } catch (error)
        {
            if (error instanceof ValidationError)
            {
                const returnData = this.returnData.returnClientData(error.code, error.message, []);
                return returnData;
            } 
            // invalid iv
            if (error instanceof Error && error.message.includes('Unsupported state or unable to authenticate data'))
            {
                const returnData = this.returnData.returnClientData(-102, 'Invalid IV or Auth Tag');
                return returnData;
            } else
            {
                const returnData = this.returnData.returnClientData(-400, 'Error');
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

    validation(id:number, name:string): void
    {
        const inputControl = new InputControl();
        inputControl.validateCommonSQLID(id);
        inputControl.validateBigAreaName(name);

    }


}
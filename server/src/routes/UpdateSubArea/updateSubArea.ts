import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { ReturnData } from "../../Return To Client";
import { ReturnClientData } from "../../Return To Client/interface";
import { LoginData as LD } from "../../Return To Client/interface";
import { UserData as UD } from "../../Return To Client/interface";
import { DBSelect } from "../../SQL/dbSelect";
import { DBUpdate } from "../../SQL/dbUpdate";
import { InputControl, ValidationError } from "../../Validators/inputControl";

export class UpdateSubArea
{
    private returnData = new ReturnData();

    async performAction(data: { UserData: LD, id:number, name:string, bigAreaID:number, colorSchemeID:number }): Promise<ReturnClientData>
    {
        try
        {
            const decUserData: UD = this.decryptUserData(data.UserData.encUserData, data.UserData.userData.id.toString());
            const userData: UD = data.UserData.userData;
            if (JSON.stringify(decUserData) === JSON.stringify(userData) && userData.class === 3)
            {
                this.validation(data.id, data.name, data.bigAreaID, data.colorSchemeID);

                const dbSelect = new DBSelect();

                const subArea = await dbSelect.selectSubAreaByID(data.id);

                const bigArea = await dbSelect.selectBigAreaByID(data.bigAreaID);

                const colorScheme = await dbSelect.selectColorSchemeByID(data.colorSchemeID);

                if (subArea.length === 0 || bigArea.length === 0 || colorScheme.length === 0)
                {
                    const returnData = this.returnData.returnClientData(-101, 'Data not found');
                    return returnData;
                }
                
                const dbUpdate = new DBUpdate();

                const result = await dbUpdate.updateSubAreaData(data.id, data.name, data.bigAreaID, data.colorSchemeID);

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

    validation(id:number, name:string, bigAreaID:number, colorSchemeID:number): void
    {
        const inputControl = new InputControl();
        inputControl.validateCommonSQLID(id);
        inputControl.validateCommonSQLID(bigAreaID);
        inputControl.validateCommonSQLID(colorSchemeID);
        inputControl.validateSubAreaName(name);
    }

}
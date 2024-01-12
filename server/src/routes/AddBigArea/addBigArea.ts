import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { ReturnData } from "../../Return To Client";
import { LoginData as LD, UserData as UD } from "../../Return To Client/interface";
import { DBInsert } from "../../SQL/dbInsert";
import { InputControl, ValidationError } from "../../Validators/inputControl";

export class AddBigArea
{

    returnData = new ReturnData();
    async performAction(data: { UserData: LD, bigArea: string; })
    {
        try
        {
            const decUserData: UD = this.decryptUserData(data.UserData.encUserData, data.UserData.userData.id.toString());
            const userData: UD = data.UserData.userData;

            if (JSON.stringify(decUserData) === JSON.stringify(userData) && userData.class === 3)
            {
                const dbInsert = new DBInsert();
                this.validation(data.bigArea);
                const result = await dbInsert.addBigArea(data.bigArea);
                if (result.affectedRows === 1)
                {
                    const returnData = this.returnData.returnClientData(0, 'Success', { id: result.insertId });
                    return returnData;
                } else
                {
                    const returnData = this.returnData.returnClientData(-400, 'Failed');
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
                // handle ValidationError
                const returnData = this.returnData.returnClientData(error.code, error.message);
                return returnData;
            }
            // invalid iv
            else if (error instanceof Error && error.message.includes('Unsupported state or unable to authenticate data'))
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

    validation(name: string): void
    {
        const inputControl = new InputControl();
        inputControl.validateBigAreaName(name);
    }

}
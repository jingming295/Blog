import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { ReturnData } from "../../Return To Client";
import { ReturnClientData } from "../../Return To Client/interface";
import { LoginData as LD } from "../../Return To Client/interface";
import { UserData as UD } from "../../Return To Client/interface";
import { DBUpdate } from "../../SQL/dbUpdate";
import { setting_loginandregisterFromUser } from "./interface";
import { InputControl, ValidationError } from "../../Validators/inputControl";

export class UpdateLoginAndRegisterSettings
{
    private returnData = new ReturnData();

    async performUpdateLoginAndRegisterSettings(data: { UserData: LD, settings: setting_loginandregisterFromUser; }): Promise<ReturnClientData>
    {
        try
        {
            const decUserData: UD = this.decryptUserData(data.UserData.encUserData, data.UserData.userData.id.toString());
            const userData: UD = data.UserData.userData;

            if (JSON.stringify(decUserData) === JSON.stringify(userData) && userData.class === 3)
            {
                this.validation(data.settings);
                const dbUpdate = new DBUpdate();
                const result = await dbUpdate.updateUserLoginAndRegisterSettings(data.settings.id, data.settings.allowUserRegis, data.settings.emailVerification);

                if (result.affectedRows === 1)
                {
                    const returnData = this.returnData.returnClientData(0, 'Update success');
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

    validation(item: setting_loginandregisterFromUser): void
    {
        const inputControl = new InputControl();
        inputControl.validateCommonSwitch(item.allowUserRegis);
        inputControl.validateCommonSwitch(item.emailVerification);
        inputControl.validateCommonSQLID(item.id);
    }
}
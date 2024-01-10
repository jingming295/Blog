import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { ReturnData } from "../../Return To Client";
import { ReturnClientData } from "../../Return To Client/interface";
import { LoginData as LD } from "../../Return To Client/interface";
import { UserData as UD } from "../../Return To Client/interface";
import { DBUpdate } from "../../SQL/dbUpdate";
import { setting_emailFromUser } from "./interface";
import { tb_setting_sendemail } from "../../SQL/interface";
import { InputControl, ValidationError } from "../../Validators/inputControl";

export class UpdateEmailSettings
{
    private returnData = new ReturnData();

    async performAction(data: { UserData: LD, settings: setting_emailFromUser; }): Promise<ReturnClientData>
    {
        try
        {
            const decUserData: UD = this.decryptUserData(data.UserData.encUserData, data.UserData.userData.id.toString());
            const userData: UD = data.UserData.userData;
            if (JSON.stringify(decUserData) === JSON.stringify(userData) && userData.class === 3)
            {
                this.validation(data.settings);
                const EmailSettingFromUser = data.settings;
                const EmailSettings: tb_setting_sendemail = {
                    s_SE_id: EmailSettingFromUser.id,
                    s_SE_senderName: EmailSettingFromUser.senderName,
                    s_SE_senderEmail: EmailSettingFromUser.senderEmail,
                    s_SE_smtpServer: EmailSettingFromUser.smtpServer,
                    s_SE_smtpPort: EmailSettingFromUser.smtpPort,
                    s_SE_smtpUsername: EmailSettingFromUser.smtpUsername,
                    s_SE_smtpPassword: EmailSettingFromUser.smtpPassword,
                    s_SE_replyEmail: EmailSettingFromUser.replyEmail,
                    s_SE_forceSSL: EmailSettingFromUser.forceSSL
                };

                const dbUpdate = new DBUpdate();
                const result = await dbUpdate.updateEmailSettings(EmailSettings);

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

    validation(item: setting_emailFromUser): void
    {
        const inputControl = new InputControl();
        if (item.senderEmail)
            inputControl.validateEmail(item.senderEmail);
        if (item.replyEmail)
            inputControl.validateEmail(item.replyEmail);
        if (item.smtpUsername)
            inputControl.validateEmail(item.smtpUsername);
        if (item.smtpPassword)
            inputControl.validateSMTPPassword(item.smtpPassword);
        if (item.smtpServer)
            inputControl.validateDomainname(item.smtpServer);
        if (item.smtpPort)
            inputControl.validatePort(item.smtpPort);

        inputControl.validateCommonSwitch(item.forceSSL);

        inputControl.validateCommonSQLID(item.id);
    }

}
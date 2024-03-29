import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { ReturnData } from "../../Return To Client";
import { LoginData as LD, UserData as UD } from "../../Return To Client/interface";
import { DBSelect } from "../../SQL/dbSelect";

export class GetEmailSettings{
    returnData = new ReturnData();
    async performAction(data:LD){
        try
        {
            const decUserData: UD = this.decryptUserData(data.encUserData, data.userData.id.toString());
            const userData: UD = data.userData;

            if (JSON.stringify(decUserData) === JSON.stringify(userData) && userData.class === 3)
            {
                const dbSelect = new DBSelect();

                const ResultSetHeaders = await dbSelect.selectSettingSendEmail();
                const result = ResultSetHeaders[0];

                const data = {
                    id:result.s_SE_id,
                    senderName: result.s_SE_senderName,
                    senderEmail: result.s_SE_senderEmail,
                    smtpServer: result.s_SE_smtpServer,
                    smtpPort: result.s_SE_smtpPort,
                    smtpUsername: result.s_SE_smtpUsername,
                    smtpPassword: result.s_SE_smtpPassword,
                    replyEmail: result.s_SE_replyEmail,
                    forceSSL: result.s_SE_forceSSL
                }

                return this.returnData.returnClientData(0, 'OK', data);

            } else
            {
                const returnData = this.returnData.returnClientData(-101, 'Not Authorized');
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
import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { ReturnData } from "../../Return To Client";
import { ReturnClientData } from "../../Return To Client/interface";
import { LoginData as LD } from "../../Return To Client/interface";
import { UserData as UD } from "../../Return To Client/interface";
import { DBUpdate } from "../../SQL/dbUpdate";
import { DBSelect } from "../../SQL/dbSelect";

export class DeleteArticle
{
    private returnData = new ReturnData();

    async performDeleteArticle(data: { UserData: LD, ArticleId: number; }): Promise<ReturnClientData>
    {
        try
        {
            const decUserData: UD = this.decryptUserData(data.UserData.encUserData, data.UserData.userData.id.toString());
            const userData: UD = data.UserData.userData;

            if (JSON.stringify(decUserData) === JSON.stringify(userData))
            {
                const dbSelect = new DBSelect();

                const dbUpdate = new DBUpdate();

                const ArticleId = await dbSelect.selectArticleIDByItsAuthor(data.ArticleId, userData.id);
                if(ArticleId.length<=0){
                    const returnData = this.returnData.returnClientData(-102, 'This article is not yours');
                    return returnData;
                }

                const ResultSetHeader = await dbUpdate.DeleteArticle(data.ArticleId);

                if (!ResultSetHeader.warningStatus && ResultSetHeader.affectedRows)
                {
                    const returnData = this.returnData.returnClientData(0, 'Delete Sucessful');
                    return returnData;
                } else
                {
                    throw new Error(ResultSetHeader.info);
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
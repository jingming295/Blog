import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { ReturnData } from "../../Return To Client";
import { UserData as UD } from "../../Return To Client/interface";
import { LoginData as LD } from '../../Return To Client/interface';
import { ArticleData as AD } from "./interface";
import { DBInsert } from "../../SQL/dbInsert";
import { DBSelect } from "../../SQL/dbSelect";
import { DBUpdate } from "../../SQL/dbUpdate";


export class UploadArticle
{
    private returnData: ReturnData;

    constructor()
    {
        this.returnData = new ReturnData();
    }
    async performUploadArticle(data: { UserData: LD, ArticleData: AD })
    {
        try
        {
            const decUserData: UD = this.decryptUserData(data.UserData.encUserData, data.UserData.userData.id.toString());
            const userData: UD = data.UserData.userData;
            if (JSON.stringify(decUserData) === JSON.stringify(userData))
            {
                const articleData = data.ArticleData;
                if(articleData.id){
                    const dbSelect = new DBSelect()
                    const dbUpdate = new DBUpdate();

                    const result = await dbSelect.selectArticleIDByItsAuthor(articleData.id, userData.id);
                    if(result.length > 0){
                        
                        const ResultSetHeader = await dbUpdate.updateArticle(articleData.id, articleData.title, articleData.article, articleData.area, articleData.tag);
    
                        if (!ResultSetHeader.warningStatus && ResultSetHeader.affectedRows)
                        {
                            const returnData = this.returnData.returnClientData(0, 'Update Sucessful');
                            return returnData;
                        } else
                        {
                            throw new Error(ResultSetHeader.info);
                        }
                    }else {
                        const returnData = this.returnData.returnClientData(-101, 'You has no permission to edit this article');
                        return returnData;
                    }
                } else {
                    const dbInsert = new DBInsert();
                    const ResultSetHeader = await dbInsert.postArticle(articleData.title, articleData.article, articleData.area, articleData.tag, userData.id);
    
                    if (!ResultSetHeader.warningStatus && ResultSetHeader.insertId)
                    {
                        const returnData = this.returnData.returnClientData(0, 'Post Sucessful');
                        return returnData;
                    } else
                    {
                        throw new Error(ResultSetHeader.info);
                    }
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
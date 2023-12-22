import { AES_256_GCM } from "../../Crypto/AES-256-GCM";
import { AES_256_GCMEncrypted } from "../../Crypto/interface";
import { ReturnData } from "../../Return To Client";
import { LoginData as LD } from "../../Return To Client/interface";
import { UserData as UD } from "../../Return To Client/interface";
import { DBSelect } from "../../SQL/dbSelect";

import { JSDOM } from 'jsdom';

export class GetArticleDataByAuthor
{
    private returnData = new ReturnData();
    async getArticleDataByAuthor(UserData: LD)
    {
        try
        {
            const decUserData: UD = this.decryptUserData(UserData.encUserData, UserData.userData.id.toString());
            const userData: UD = UserData.userData;
            if (JSON.stringify(decUserData) === JSON.stringify(userData))
            {
                const dbSelect = new DBSelect();
                const resultSetHeader = await dbSelect.selectArticleCardByID(userData.id);

                if (resultSetHeader.length > 0)
                {
                    let manageArticleData = resultSetHeader.map(item => {
                        const dom = new JSDOM(item.article_content);
                        const firstParagraph = dom.window.document.querySelector('p');
                    
                        // Get text content of the first non-empty <p> element
                        const pText = firstParagraph?.textContent?.trim() || null; // Use null if the <p> is empty
                    
                        return {
                            articleID: item.article_id,
                            articleTitle: item.article_title,
                            articleArea: item.article_area,
                            author: item.u_name,
                            p: pText,
                        };
                    });

                    const returnData = this.returnData.returnClientData(0, 'Sucessful', manageArticleData);
                    return returnData;
                } else
                {
                    const returnData = this.returnData.returnClientData(-101, 'You have not post any article yet');
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
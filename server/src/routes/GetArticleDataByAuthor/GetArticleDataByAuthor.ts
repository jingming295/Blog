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
    async getArticleDataByAuthor(UserID: number)
    {
        try
        {

            const dbSelect = new DBSelect();
            const resultSetHeader = await dbSelect.selectArticleCardByID(UserID);

            if (resultSetHeader.length > 0)
            {
                let manageArticleData = resultSetHeader.map(item =>
                {
                    const dom = new JSDOM(item.article_content);
                    const paragraphs = dom.window.document.querySelectorAll('p');
                    let firstNonEmptyPText = null;

                    for (const paragraph of paragraphs)
                    {
                        const pText = paragraph.textContent?.trim();
                        if (pText)
                        {
                            firstNonEmptyPText = pText;
                            break;
                        }
                    }
                    if (!firstNonEmptyPText)
                    {
                        const spans = dom.window.document.querySelectorAll('span');

                        for (const span of spans)
                        {
                            const spanText = span.textContent?.trim();
                            if (spanText)
                            {
                                firstNonEmptyPText = spanText;
                                break;
                            }
                        }
                    }

                    return {
                        articleID: item.article_id,
                        articleTitle: item.article_title,
                        articleArea: item.article_area,
                        author: item.article_author_name,
                        p: firstNonEmptyPText,
                    };
                });

                const returnData = this.returnData.returnClientData(0, 'Sucessful', manageArticleData);
                return returnData;
            } else
            {
                const returnData = this.returnData.returnClientData(-101, 'You have not post any article yet');
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

}
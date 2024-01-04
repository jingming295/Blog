import { DBSelect } from "../../SQL/dbSelect";
import { ReturnData } from "../../Return To Client";
import { JSDOM } from 'jsdom';
import { RetArticleCardData } from "./interface";
import { ArticleCardData } from "../../SQL/interface";

export class GetArticleCardData
{

    returnData = new ReturnData();
    getArticleCardData = async () =>
    {
        try
        {
            const dbSelect = new DBSelect();
            const articleCardData = await dbSelect.selectArticleCardData();
            return this.generateReturnData(articleCardData)
        } catch (error)
        {
            const returnData = this.returnData.returnClientData(-400, 'Error');
            console.log(error);
            return returnData;
        }

    };

    getArticleContentByArea = async (area: string) =>
    {
        try
        {
            const dbSelect = new DBSelect();
            const articleCardData = await dbSelect.selectArticleCardDataByArea(area);
            return this.generateReturnData(articleCardData)
        } catch (error)
        {
            const returnData = this.returnData.returnClientData(-400, 'Error');
            console.log(error);
            return returnData;
        }

    };

    getArticleContentByKeyword = async (keyword: string) =>
    {
        try
        {
            const dbSelect = new DBSelect();
            const articleCardData = await dbSelect.selectArticleCardDataByKeyword(keyword);
            return this.generateReturnData(articleCardData)
        } catch (error)
        {
            const returnData = this.returnData.returnClientData(-400, 'Error');
            console.log(error);
            return returnData;
        }

    };

    private generateReturnData(articleCardData:ArticleCardData[]){
        if (articleCardData.length > 0)
        {
            let manageArticleData = articleCardData.map(item =>
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

                // If all <p> elements are empty, try finding <span>
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
                const returnData: RetArticleCardData = {
                    article: {
                        articleID: item.article_id,
                        articleTitle: item.article_title,
                        articleArea: item.article_area,
                        articleFirstLine: firstNonEmptyPText,
                        articleLastEditTime: item.article_lastEditTime,
                    },
                    author: {
                        articleAuthorID: item.article_author_id,
                        articleAuthor: item.article_author_name,
                        articleAuthorAvatar: item.article_author_avatar
                    },
                    colorScheme: {
                        areaTextColor: item.cs_textColor,
                        areaBackgroundColor: item.cs_backgroundColor
                    }
                };
                return returnData;
            });

            const returnData = this.returnData.returnClientData(0, 'Sucessful', manageArticleData);
            return returnData;
        } else
        {
            const returnData = this.returnData.returnClientData(-101, 'There is no article');
            return returnData;
        }
    }
}
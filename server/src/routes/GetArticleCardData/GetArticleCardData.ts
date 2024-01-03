import { DBSelect } from "../../SQL/dbSelect";
import { ReturnData } from "../../Return To Client";
import { JSDOM } from 'jsdom';
import { RetArticleCardData } from "./interface";

export class GetArticleCardData
{

    returnData = new ReturnData();
    getArticleCardData = async () =>
    {
        try
        {
            const dbSelect = new DBSelect();
            const articleCardData = await dbSelect.selectArticleCardData();
            if (articleCardData.length > 0)
            {
                let manageArticleData = articleCardData.map(item =>
                {
                    const dom = new JSDOM(item.article_content);
                    const firstParagraph = dom.window.document.querySelector('p');

                    // Get text content of the first non-empty <p> element
                    const pText = firstParagraph?.textContent?.trim() || null; // Use null if the <p> is empty
                    const returnData:RetArticleCardData = {
                        article: {
                            articleID: item.article_id,
                            articleTitle: item.article_title,
                            articleArea: item.article_area,
                            articleFirstLine: pText,
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
                    }
                    return returnData
                });

                const returnData = this.returnData.returnClientData(0, 'Sucessful', manageArticleData);
                return returnData;
            } else
            {
                const returnData = this.returnData.returnClientData(-101, 'There is no article');
                return returnData;
            }
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
            if (articleCardData.length > 0)
            {
                let manageArticleData = articleCardData.map(item =>
                {
                    const dom = new JSDOM(item.article_content);
                    const firstParagraph = dom.window.document.querySelector('p');

                    // Get text content of the first non-empty <p> element
                    const pText = firstParagraph?.textContent?.trim() || null; // Use null if the <p> is empty

                    const returnData:RetArticleCardData = {
                        article: {
                            articleID: item.article_id,
                            articleTitle: item.article_title,
                            articleArea: item.article_area,
                            articleFirstLine: pText,
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
                    }
                    return returnData
                });

                const returnData = this.returnData.returnClientData(0, 'Sucessful', manageArticleData);
                return returnData;
            } else
            {
                const returnData = this.returnData.returnClientData(-101, 'There is no article');
                return returnData;
            }
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
            if (articleCardData.length > 0)
            {
                let manageArticleData = articleCardData.map(item =>
                {
                    const dom = new JSDOM(item.article_content);
                    const firstParagraph = dom.window.document.querySelector('p');

                    // Get text content of the first non-empty <p> element
                    const pText = firstParagraph?.textContent?.trim() || null; // Use null if the <p> is empty

                    const returnData:RetArticleCardData = {
                        article: {
                            articleID: item.article_id,
                            articleTitle: item.article_title,
                            articleArea: item.article_area,
                            articleFirstLine: pText,
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
                    }
                    return returnData
                });

                const returnData = this.returnData.returnClientData(0, 'Sucessful', manageArticleData);
                return returnData;
            } else
            {
                const returnData = this.returnData.returnClientData(-101, 'There is no article');
                return returnData;
            }
        } catch (error)
        {
            const returnData = this.returnData.returnClientData(-400, 'Error');
            console.log(error);
            return returnData;
        }

    };
}
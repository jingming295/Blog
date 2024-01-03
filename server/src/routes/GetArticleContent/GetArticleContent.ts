import { DBSelect } from "../../SQL/dbSelect"
import { ReturnData } from "../../Return To Client";
import { RetArticleData } from "./interface";


export class GetArticleContent{

    returnData = new ReturnData();
    getArticleContent = async (id:string) => {
        try {
            const dbSelect = new DBSelect();
            const articleCardData = await dbSelect.selectArticleContent(id);

            const data = articleCardData.map(item => {
                const returnData:RetArticleData = {
                    article: {
                        articleID: item.article_id,
                        articleTitle: item.article_title,
                        articleArea: item.article_area,
                        articleContent: item.article_content,
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
                return returnData;
            });
            if(data.length === 0){
                return this.returnData.returnClientData(-101, 'Article Not Found');
            }
            return this.returnData.returnClientData(0, 'sucessful', data[0]);
        } catch (error) {
            const returnData = this.returnData.returnClientData(-400, 'Error');
            console.log(error);
            return returnData;
        }

    }
}
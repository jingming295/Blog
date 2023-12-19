import { DBSelect } from "../../SQL/dbSelect"
import { ReturnData } from "../../Return To Client";


export class GetArticleCardData{

    returnData = new ReturnData();
    getArticleCardData = async () => {
        try {
            const dbSelect = new DBSelect();
            const articleCardData = await dbSelect.selectArticleCardData();

            const data = articleCardData.map(item => {
                return {
                    articleId: item.article_id,
                    articleTitle: item.article_title,
                    articleAuthor: item.u_name
                };
            });
            return this.returnData.returnClientData(0, 'sucessful', data);
        } catch (error) {
            const returnData = this.returnData.returnClientData(-400, 'Error');
            console.log(error);
            return returnData;
        }

    }
}
import { ReturnData } from "../../Return To Client";
import { DBSelect } from "../../SQL/dbSelect";
import { ArticleArea } from "./interface";

export class GetAllArticleArea
{
    returnData = new ReturnData();
    async performAction()
    {
        try
        {
            const dbSelect = new DBSelect();
            const result = await dbSelect.selectAllArticleArea();


            const groupedResult: { [key: string]: string[] } = {};
            result.forEach(item => {
                if (!groupedResult[item.ba_name]) {
                    groupedResult[item.ba_name] = [item.aa_area];
                } else {
                    groupedResult[item.ba_name].push(item.aa_area);
                }
            });

            const finalResult:ArticleArea[] = Object.keys(groupedResult).map(key => {
                return {
                    AreaName: key,
                    subArea: groupedResult[key]
                };
            });
            const returnData = this.returnData.returnClientData(0, 'Sucessful', finalResult);
            return returnData;
        } catch (error)
        {
            const returnData = this.returnData.returnClientData(-400, 'Error');
            console.log(error);
            return returnData;
        }
    }
}
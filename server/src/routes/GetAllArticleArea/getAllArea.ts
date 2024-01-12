import { ReturnData } from "../../Return To Client";
import { DBSelect } from "../../SQL/dbSelect";
import { ArticleArea, Subarea } from "./interface";

export class GetAllArticleArea
{
    returnData = new ReturnData();
    async performAction()
    {
        try
        {
            const dbSelect = new DBSelect();


            const result = await dbSelect.selectAllArticleArea();

            const groupedResult: { [key: number]: Subarea[]; } = {};
            result.forEach(item =>
            {
                const subarea: Subarea = {
                    subAreaID: item.aa_id,
                    subareaName: item.aa_area,
                    colorscheme: item.cs_id !== null && item.cs_textColor !== null && item.cs_backgroundColor !== null ? {
                        id: item.cs_id,
                        textColor: item.cs_textColor,
                        backgroundColor: item.cs_backgroundColor
                    } : null
                };
                if (!groupedResult[item.ba_id])
                {
                    groupedResult[item.ba_id] = [subarea];
                } else
                {
                    groupedResult[item.ba_id].push(subarea);
                }
            });

            const finalResult: ArticleArea[] = Object.keys(groupedResult).map(key =>
            {
                const foundItem = result.find(item => item.ba_id === parseInt(key));
                const bigAreaName = foundItem ? foundItem.ba_name : 'Not found';
                return {
                    bigareaID: parseInt(key),
                    bigAreaName: bigAreaName,
                    subarea: groupedResult[parseInt(key)]
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
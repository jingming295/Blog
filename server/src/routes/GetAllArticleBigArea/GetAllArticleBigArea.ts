import { ReturnData } from "../../Return To Client";
import { DBSelect } from "../../SQL/dbSelect";
import { AllArticleBigArea } from "./interface";

export class GetAllArticleBigArea
{
    returnData = new ReturnData();
    async performAction()
    {
        try
        {
            const dbSelect = new DBSelect();
            const result = await dbSelect.selectAllArticleBigArea();

            const returnResult:AllArticleBigArea[] = result.map((item) =>
            {
                return {
                    id: item.ba_id,
                    name: item.ba_name
                };

            });

            const returnData = this.returnData.returnClientData(0, 'Sucessful', returnResult);
            return returnData;
        } catch (error)
        {
            const returnData = this.returnData.returnClientData(-400, 'Error');
            console.log(error);
            return returnData;
        }
    }
}
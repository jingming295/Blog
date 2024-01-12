import { ReturnData } from "../../Return To Client";
import { DBSelect } from "../../SQL/dbSelect";
import { ReformColorSchemeData } from "./interface";

export class GetAllColorScheme
{
    private returnData = new ReturnData();

    async performAction()
    {
        try
        {
            const dbSelect = new DBSelect();
            const colorSchemeData = await dbSelect.selectAllColorScheme();
            if(colorSchemeData.length === 0){
                const returnData = this.returnData.returnClientData(-101, 'Color Scheme not found');
                return returnData
            } else {
                const reformColorSchemeData:ReformColorSchemeData[] = colorSchemeData.map((colorScheme) => {
                    return {
                        id: colorScheme.cs_id,
                        textColor: colorScheme.cs_textColor,
                        backgroundColor: colorScheme.cs_backgroundColor
                    }
                })
                const returnData = this.returnData.returnClientData(0, 'sucess', reformColorSchemeData);
                return returnData
            }

        } catch (error)
        {

            // handle common error
            const returnData = this.returnData.returnClientData(-400, 'Error', []);
            console.log(error);
            return returnData;

        }

    }
}
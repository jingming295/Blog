import { ReturnClientData as RCD } from '../../Return To Client/interface';
import { DBSelect } from '../../SQL/dbSelect';
import { ReturnData } from '../../Return To Client';
import { ValidationError } from '../../Validators/inputControl';

export class NormalRequestUserProfile
{



    private returnData: ReturnData;

    constructor()
    {
        this.returnData = new ReturnData();
    }
    async requestUserProfile(id: { id: string; }): Promise<RCD>
    {
        try
        {

            const numericId = parseInt(id.id, 10);
            const dbSelect = new DBSelect();
            if (isNaN(numericId))
            {
                const returnData = this.returnData.returnClientData(-101, 'ID must be numeric');
                return returnData
            }

            const userProfileData = await dbSelect.selectUserProfile(numericId)
            if(userProfileData.length === 0){
                const returnData = this.returnData.returnClientData(-101, 'User not found');
                return returnData
            }
            const clientUserProfileData = {
                id: userProfileData[0].u_id,
                name: userProfileData[0].u_name,
                email: userProfileData[0].u_email,
                class: userProfileData[0].u_class,
                avatar: userProfileData[0].avatar_name
            }
            const returnData = this.returnData.returnClientData(0, 'sucess', clientUserProfileData);
            return returnData



        } catch (error)
        {
            if (error instanceof ValidationError)
            {
                // handle ValidationError
                const returnData = this.returnData.returnClientData(error.code, error.message, []);
                return returnData;
            } else
            {
                // handle common error
                const returnData = this.returnData.returnClientData(-400, 'Error', []);
                console.log(error);
                return returnData;
            }
        }

    }
}
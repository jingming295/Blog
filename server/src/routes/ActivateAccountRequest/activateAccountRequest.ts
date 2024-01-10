import { DBSelect } from "../../SQL/dbSelect";
import { DBUpdate } from "../../SQL/dbUpdate";
import { InputControl } from "../../Validators/inputControl";

export class ActivateAccountRequest{
    

    async performAction(token:string){
        this.inputVerification(token);

        const dbSelect = new DBSelect();

        const result = await dbSelect.selectUserIDStatusByToken(token);

        if(result.length === 0){
            return {code: -101, message: 'Token is not valid'};
        }

        if(result[0].u_active === 1){
            return {code: -102, message: 'Account is already activated'};
        }

        const dbUpdate = new DBUpdate();
        const updateResult = await dbUpdate.updateUserActiveStatusByID(result[0].u_id);

        if(updateResult.affectedRows === 1){
            return {code: 0, message: 'Account activated'};
        } else {
            return {code: -103, message: 'Account activation failed'};
        }

    }

    inputVerification(token:string){
        const inputControl = new InputControl();
        inputControl.verifyToken(token);
    }
}
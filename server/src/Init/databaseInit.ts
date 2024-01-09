import { DBInsert } from "../SQL/dbInsert";
import { DBSelect } from "../SQL/dbSelect";

export class DatabaseInit{
    async LoginAndRegisterInit(){
        const dbSelect = new DBSelect();

        const settingSendEmail = await dbSelect.selectSettingSendEmail();
        if(settingSendEmail.length === 0){
            const dbInsert = new DBInsert();
            await dbInsert.insertDefaultSettingSendEmail();
        }

        const settingLoginAndRegister = await dbSelect.selectSettingLoginAndRegister();
        if(settingLoginAndRegister.length === 0){
            const dbInsert = new DBInsert();
            await dbInsert.insertDefaultSettingLoginAndRegister();
        }


    }
}
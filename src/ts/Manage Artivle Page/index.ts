import { SendPost } from "../Send Fetch";
import { UserData } from "../Navigation Bar/interface";
import { HandlePopMsg } from "../Navigation Bar/popMsg";
import { ChangePage } from "../Navigation Bar/changePage";
import { UserVerification } from "../User Verification";

export class ManageArticle{
    handlePopMsg = new HandlePopMsg();
    async init(){
        const userVerification = new UserVerification();
        if(await userVerification.verification()){
        }
    }
}
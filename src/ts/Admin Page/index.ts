import { UserData } from "../Navigation Bar/interface";
import { UserVerification } from "../User Verification";

export class AdminPage{
    init(){
        const userVerification = new UserVerification();
        userVerification.verification();
        const userData = localStorage.getItem('UserData');
        if(userData){
            const parseUserData = JSON.parse(userData) as UserData;
            

        }

    }
}
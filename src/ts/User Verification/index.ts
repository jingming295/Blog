import { ChangePage } from "../Navigation Bar/changePage";
import { UserData } from "../Navigation Bar/interface";
import { HandlePopMsg } from "../Navigation Bar/popMsg";
import { SendPost } from "../Send Fetch";

export class UserVerification{
    handlePopMsg = new HandlePopMsg();
    async verification(){
        const sendPost = new SendPost();
        const UserData = localStorage.getItem('UserData');
        if (UserData !== null)
        {
            const parseUserData: UserData = JSON.parse(UserData);
            return await sendPost.KeepLogin(parseUserData);

        } else
        {
            localStorage.clear();
            const changePage = new ChangePage(true);
            await changePage.toIndex();
            location.reload();
            return false
        }
    }
}
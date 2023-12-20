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
            const params = {
                UserData: parseUserData,
            };
            return await sendPost.postWithUrlParams('keeplogin', params)
                .then((response) =>
                {
                    if (response.code === 0)
                    {
                        return true;
                    } else
                    {
                        this.handlePopMsg.popMsg(response.message);
                        localStorage.clear();
                        // const changePage = new ChangePage(true);
                        // changePage.toIndex();
                    }
                })
                .catch((error) =>
                {
                    this.handlePopMsg.popMsg((error as Error).message);
                });
        } else
        {
            localStorage.clear();
            const changePage = new ChangePage(true);
            changePage.toIndex();
            location.reload();
        }
    }
}
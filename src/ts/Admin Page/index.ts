import { ChangePage } from "../Navigation Bar/changePage";
import { UserData } from "../Navigation Bar/interface";
import { SendPost } from "../Send Fetch";
import { UserVerification } from "../User Verification";

export class AdminPage{
    async init(){
        const userVerification = new UserVerification();
        userVerification.verification();
        const userData = localStorage.getItem('UserData');
        if(userData){
            const parseUserData = JSON.parse(userData) as UserData;
            const sendPost = new SendPost();
            const result = await sendPost.KeepLogin(parseUserData);
            if(!result){
                const changePage = new ChangePage();
                changePage.toIndex();
                return;
            }
            if(parseUserData.userData.class !==3){
                const changePage = new ChangePage();
                changePage.toIndex();
                return;
            }
            
            const contentDiv = document.createElement('contentDiv');
            contentDiv.className = 'contentDiv';
            contentDiv.id = 'contentDiv';

            const adminPageWrapper = this.CreateAdminPage();
            contentDiv.appendChild(adminPageWrapper);

            document.body.appendChild(contentDiv);
        }

    }

    private CreateAdminPage(){
        const adminPageWrapper = document.createElement('div');
        adminPageWrapper.className = 'adminPageWrapper';

        const sideNavBarWrapper = this.createSideNavBar();

        adminPageWrapper.appendChild(sideNavBarWrapper);

        return adminPageWrapper;
    }

    private createSideNavBar(){
        const sideNavBarWrapper = document.createElement('div'); 
        sideNavBarWrapper.className = 'sideNavBarWrapper';



        return sideNavBarWrapper;
    }
}
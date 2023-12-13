import { urlconfig } from '../Url Config/Live Server Url Config';
import { MainPage } from '../Main Page';
import { MakeUserProfile } from '../User Profile';
import { CreateNewPost } from '../Create New Post';
export class ChangePage {
    toUserProfile (id:string) {
        document.title = 'User';
        const makeUserProfile = new MakeUserProfile();
        window.location.href = urlconfig.url + '/#/u?id=' + id;
        makeUserProfile.Init();
    }

    toPostArticle () {
        document.title = 'Post Article';
        window.location.href = urlconfig.url + '/#/newpost';
        const createNewPost = new CreateNewPost();
        createNewPost.init();
    }

    toIndex () {
        document.title = 'Blog';
        window.location.href = urlconfig.url + '/#';
        const mainPage = new MainPage();
        mainPage.init();
        
    }
}
import { urlconfig } from '../Url Config/Live Server Url Config';
import { MainPage } from '../Main Page';
import { MakeUserProfile } from '../User Profile';
import { CreateNewPost } from '../Create New Post';
import { MakeArticlePage } from '../Article Page';
import { Page404 } from '../404 Page';
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

    toArticle (id:string) {
        document.title = 'Article';
        window.location.href = urlconfig.url + '/#/p?id=' + id;
        const makeArticlePage = new MakeArticlePage();
        makeArticlePage.init();
    }

    to404Page(){
        document.title = '404 Page Not Found';
        window.location.href = urlconfig.url + '/#/404';

        const page404 = new Page404();

        page404.init();
    }
}
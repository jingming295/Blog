import { urlconfig } from '../Url Config/config';
import { MainPage } from '../Main Page';
import { MakeUserProfile } from '../User Profile';
import { UploadArticle } from '../UploadArticle';
import { MakeArticlePage } from '../Article Page';
import { Page404 } from '../404 Page';
import { ManageArticle } from '../Manage Article Page';
import { NavRelated } from '.';
import { AreaPage } from '../Main Page/articleByArea';
import { SearchResultPage } from '../Main Page/articleBySearch';
import { AdminPage } from '../Admin Page';
import { ActivateAccountPage } from '../Activate Account Page';
export class ChangePage {
    constructor(DeletePrevious:boolean = false) {
        if (!(document.getElementById('navigationBar')))
        {
            const navRelated = new NavRelated();
            navRelated.init();
        }
        if(DeletePrevious){
            const contentDiv = document.getElementById('contentDiv');
            if (contentDiv)
            {
                contentDiv.remove();
            }
        }

    }
    toUserProfile (id:string) {
        document.title = 'User';
        const makeUserProfile = new MakeUserProfile();
        window.location.href = urlconfig.url + '/#/u?id=' + id;
        makeUserProfile.Init();
    }

    toPostArticle () {
        document.title = 'Post Article';
        window.location.href = urlconfig.url + '/#/newpost';
        const createNewPost = new UploadArticle();
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

    toManageArticle(){
        document.title = 'Manage Article';
        window.location.href = urlconfig.url + '/#/manage article';
        const manageArticle = new ManageArticle();
        manageArticle.init();
    }

    async toEditArticle(id:number){
        document.title = 'Edit Article';
        window.location.href = urlconfig.url + '/#/editArticle?id=' + id;
        const updateArticle = new UploadArticle();
        await updateArticle.init(id);
    }

    toArea(area:string){

        document.title = area;
        window.location.href = urlconfig.url + '/#/area?area=' + area;
        const areaPage = new AreaPage();
        areaPage.init(area);
    }

    toSearch(value:string){
        document.title = 'Search';
        window.location.href = urlconfig.url + '/#/search?keyword=' + value;
        const searchResultPage = new SearchResultPage();
        searchResultPage.init(value);
    }

    toAdminPage(){
        document.title = 'Admin Page';
        window.location.href = urlconfig.url + '/#/admin';
        const adminPage = new AdminPage()
        adminPage.init();
    }
    
    toActivateAccountPage(){
        document.title = 'Activate Account';
        const activateAccountPage = new ActivateAccountPage();
        activateAccountPage.init();
    }
}
import { urlconfig } from '../Url Config/Live Server Url Config';
import { MainPage } from '../Main Page';
import { MakeUserProfile } from '../User Profile';
import { UploadArticle } from '../UploadArticle';
import { MakeArticlePage } from '../Article Page';
import { Page404 } from '../404 Page';
import { ManageArticle } from '../Manage Article Page';
import { NavRelated } from '.';
import { AreaPage } from '../Area Page';
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

    toEditArticle(id:number){
        document.title = 'Edit Article';
        window.location.href = urlconfig.url + '/#/editArticle?id=' + id;
        const updateArticle = new UploadArticle();
        updateArticle.init(id);
    }

    toArea(area:string){

        document.title = area;
        window.location.href = urlconfig.url + '/#/area?area=' + area;
        const areaPage = new AreaPage();
        areaPage.init(area);
    }

}
import { ChangePage } from "./Navigation Bar/changePage";
import "../scss/IndexPage/index.scss";
import "../scss/Nav/index.scss";
import { NavigationProgress } from "./Create Navigation Progress";

/**
 * IndexPageHandler class handles index page functionality.
 * @class
 * @classdesc Handles index page functionality.
 */
class init
{
    /**
     * Constructor for ActivationPage class.
     * @constructor
     */
    async init()
    {
        const hash = window.location.hash;
        const changePage = new ChangePage();
        if (hash.startsWith('#/u'))
        {
            const id = hash.slice(hash.indexOf('?id=') + 4);
            if (id && Number.isInteger(parseInt(id)))
            {
                changePage.toUserProfile(id);
            } else
            {
                changePage.toIndex();
            }
        } else if (hash === '')
        {
            changePage.toIndex();
        } else if (hash.startsWith('#/newpost'))
        {
            changePage.toPostArticle();
        } else if (hash.startsWith('#/p'))
        {
            const id = hash.slice(hash.indexOf('?id=') + 4);
            if (id && Number.isInteger(parseInt(id)))
            {
                changePage.toArticle(id);
            } else
            {
                changePage.toIndex();
            }
        } else if (hash.startsWith('#/404'))
        {
            changePage.to404Page();
        } else if (hash.startsWith('#/manage%20article'))
        {
            changePage.toManageArticle();
        } else if (hash.startsWith('#/editArticle'))
        {
            const id = hash.slice(hash.indexOf('?id=') + 4);
            if (id && Number.isInteger(parseInt(id)))
            {
                await changePage.toEditArticle(parseInt(id));
            } else
            {
                changePage.toIndex();
            }
        } else if (hash.startsWith('#/area'))
        {
            const area = hash.slice(hash.indexOf('?area=') + 6);
            if (area)
            {
                changePage.toArea(area);
            } else
            {
                changePage.toIndex();
            }
        } else if (hash.startsWith('#/search')){
            const keyword = hash.slice(hash.indexOf('?keyword=') + 9);
            console.log(keyword)
            if (keyword)
            {
                changePage.toSearch(keyword);
            } else
            {
                changePage.toIndex();
            }
        
        }
        else
        {
            changePage.toIndex();
        }
        const navigationProgress = new NavigationProgress();
        navigationProgress.init();
    }


}

window.addEventListener('load', () =>
{
    const i = new init();
    i.init();
});
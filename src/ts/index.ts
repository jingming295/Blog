import { ChangePage } from "./Navigation Bar/changePage";
import "../scss/IndexPage/index.scss";
import "../scss/Nav/index.scss";

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
    init()
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
        } else {
            changePage.toIndex();
        }
    }

    
}

window.addEventListener('load', () =>
{
    const i = new init();
    i.init();
});
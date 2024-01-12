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
     * 
     * @constructor
     */
    async init()
    {
        const hash = window.location.hash;
        const changePage = new ChangePage();
        let conformPromis: Promise<boolean> | null = null;

        ([{
            inc: ['#/u'],
            fn: async () =>
            {
                const id = hash.slice(hash.indexOf('?id=') + 4);
                if (id && Number.isInteger(parseInt(id)))
                {
                    await changePage.toUserProfile(id);
                } else
                {
                    await changePage.toIndex();
                }
                return true;
            }
        }, {
            inc: ['#/newpost'],
            fn: async () =>
            {
                await changePage.toPostArticle();
                return true;
            }
        }, {
            inc: ['#/p'],
            fn: async () =>
            {
                const id = hash.slice(hash.indexOf('?id=') + 4);
                if (id && Number.isInteger(parseInt(id)))
                {
                    await changePage.toArticle(id);
                } else
                {
                    await changePage.toIndex();
                }
                return true;
            }
        }, {
            inc: ['#/404'],
            fn: async () =>
            {
                changePage.to404Page();
                return true;
            }
        }, {
            inc: ['#/manage%20article'],
            fn: async () =>
            {
                await changePage.toManageArticle();
                return true;
            }
        }, {
            inc: ['#/editArticle'],
            fn: async () =>
            {
                const id = hash.slice(hash.indexOf('?id=') + 4);
                if (id && Number.isInteger(parseInt(id)))
                {
                    await changePage.toEditArticle(parseInt(id));
                } else
                {
                    await changePage.toIndex();
                }
                return true;
            }
        }, {
            inc: ['#/area'],
            fn: async () =>
            {
                const area = hash.slice(hash.indexOf('?area=') + 6);
                if (area)
                {
                    await changePage.toArea(area);
                } else
                {
                    await changePage.toIndex();
                }
                return true;
            }
        }, {
            inc: ['#/search'],
            fn: async () =>
            {
                const keyword = hash.slice(hash.indexOf('?keyword=') + 9);
                console.log(keyword);
                if (keyword)
                {
                    await changePage.toSearch(keyword);
                } else
                {
                    await changePage.toIndex();
                }
                return true;
            }
        }, {
            inc: ['#/admin'],
            fn: async () =>
            {
                await changePage.toAdminPage();
                return true;
            }
        }, {
            inc: ['#/activateAccount'],
            fn: async () =>
            {
                const token = hash.slice(hash.indexOf('?token=') + 7);
                if (token)
                {
                    await changePage.toActivateAccountPage();
                } else
                {
                    await changePage.toIndex();
                }
                return true;
            }
        }]).some(o =>
        {
            if (o.inc.every(k => hash.startsWith(k)))
            {
                conformPromis = o.fn();
                return true;
            }
            else
                return false;
        });
        if(!conformPromis){
            await changePage.toIndex();
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
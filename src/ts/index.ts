import { ChangePage } from "./Navigation Bar/changePage";
import "../scss/Index Page/index.scss"
import "../scss/Nav/nav.scss"

/**
 * IndexPageHandler class handles index page functionality.
 * @class
 * @classdesc Handles index page functionality.
 */
class IndexPageHandler {
    /**
     * Constructor for ActivationPage class.
     * @constructor
     */
    init () {
        const hash = window.location.hash;
        const changePage = new ChangePage();
        if (hash.startsWith('#/u')) {
            const id = hash.slice(hash.indexOf('?id=') + 4);
            if (id && Number.isInteger(parseInt(id))) {
                changePage.toUserProfile(id);
            } else {
                changePage.toIndex();
            }
        } else if (hash === '') {
            changePage.toIndex();
        } else if (hash.startsWith('#/newpost')) {
            changePage.toPostArticle();
        } else {
            changePage.toIndex();
        }
    }
}

window.addEventListener('load', () => {
    // eslint-disable-next-line no-unused-vars
    const indexPageHandler = new IndexPageHandler();
    indexPageHandler.init()
});

import { NavRelated } from '../Navigation Bar';
export class MainPage{
    init = () => {
        if (!(document.getElementById('navigationBar'))) {
            const navRelated = new NavRelated();
            navRelated.MakeNav();
        }
        this.DeletePreviousPageComponent();
    };

    DeletePreviousPageComponent = () => {
        const contentDiv = document.getElementById('contentDiv');
        if (contentDiv) {
            contentDiv.remove();
        }
    };
}
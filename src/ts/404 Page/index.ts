import '../../scss/404Page/index.scss';

export class Page404{
    
    init(){
        const site = document.body;
        if (site)
        {
            this.append404Page(site)
        }
    }

    private append404Page(site:HTMLElement){
        const contentDiv = document.createElement('div');
        contentDiv.id = 'contentDiv';
        contentDiv.className = 'contentDiv';
        
        const wrapper404 = document.createElement('div');

        wrapper404.className = 'wrapper-404';

        const h1 = document.createElement('h1');
        h1.innerHTML = '404';
        h1.className = 'error-404';

        wrapper404.appendChild(h1);

        contentDiv.appendChild(wrapper404);

        site.appendChild(contentDiv);

    }
}
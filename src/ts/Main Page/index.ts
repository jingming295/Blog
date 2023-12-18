import { NavRelated } from '../Navigation Bar';
import '../../scss/Main Page/index.scss';
export class MainPage{
    init = () => {
        if (!(document.getElementById('navigationBar'))) {
            const navRelated = new NavRelated();
            navRelated.MakeNav();
        }
        this.DeletePreviousPageComponent();
        this.createContentDiv();
    };

    createContentDiv = () => {

        const contentDiv = document.createElement('div');
        const ArticleWrapper = document.createElement('div');


        const ArticleTitleWrapper = document.createElement('div');

        const ArticleAuthorWrapper = document.createElement('div');

        const ArticleCard = document.createElement('div');
        const ArticleTitle = document.createElement('h4');
        const ArticleAuthor = document.createElement('p');
        const articleId = document.createElement('input');

        articleId.type = 'hidden';

        articleId.value = '1';

        ArticleTitle.innerHTML = 'C++ is the best programming language';
        ArticleAuthor.innerHTML = 'Jingming295';

        contentDiv.id = 'contentDiv';
        contentDiv.className = 'contentDiv';
        
        ArticleCard.className = 'ArticleCard';

        ArticleTitleWrapper.appendChild(ArticleTitle);
        ArticleAuthorWrapper.appendChild(ArticleAuthor);

        ArticleCard.appendChild(ArticleTitleWrapper);
        ArticleCard.appendChild(ArticleAuthorWrapper);
        ArticleCard.appendChild(articleId);

        ArticleWrapper.appendChild(ArticleCard);
    
        contentDiv.appendChild(ArticleWrapper);
        
        document.body.appendChild(contentDiv);

        
    }

    DeletePreviousPageComponent = () => {
        const contentDiv = document.getElementById('contentDiv');
        if (contentDiv) {
            contentDiv.remove();
        }
    };
}
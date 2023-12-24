import { NavRelated } from '../Navigation Bar';
import { SendPost } from '../Send Fetch';
import { HandlePopMsg } from '../Navigation Bar/popMsg';

import '../../scss/MainPage/index.scss';
import { ChangePage } from '../Navigation Bar/changePage';
export class MainPage
{
    private handlePopMsg = new HandlePopMsg();
    init = () =>
    {
        this.createContentDiv();
    };

    private createContentDiv = async () =>
    {
        function createArticleCard(title: string, author: string, id: string)
        {
            const ArticleCard = document.createElement('div');

            const TitleWrapper = document.createElement('div');

            const AuthorWrapper = document.createElement('div');

            const ArticleTitle = document.createElement('h4');
            const ArticleAuthor = document.createElement('p');
            const articleId = document.createElement('input');


            ArticleTitle.onclick = () => {
                const changePage = new ChangePage(true);
                changePage.toArticle(id);
            }

            ArticleTitle.innerHTML = title;
            ArticleAuthor.innerHTML = author;

            articleId.type = 'hidden';
            articleId.value = id;

            contentDiv.id = 'contentDiv';
            contentDiv.className = 'contentDiv';

            ArticleCard.className = 'ArticleCard';

            TitleWrapper.appendChild(ArticleTitle);
            AuthorWrapper.appendChild(ArticleAuthor);

            ArticleCard.appendChild(TitleWrapper);
            ArticleCard.appendChild(AuthorWrapper);
            ArticleCard.appendChild(articleId);
            return ArticleCard;
        }
        const sendPost = new SendPost();
        const contentDiv = document.createElement('div');
        const ArticleWrapper = document.createElement('div');
        const articleData = await sendPost.getArticleData();

        for (let i = 0; i < articleData.length; i++)
        {
            const ArticleCard = createArticleCard(articleData[i].articleTitle, articleData[i].articleAuthor, articleData[i].articleId);
            ArticleWrapper.appendChild(ArticleCard);
        }

        contentDiv.appendChild(ArticleWrapper);

        document.body.appendChild(contentDiv);

    };


}
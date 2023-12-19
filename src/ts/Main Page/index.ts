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
        if (!(document.getElementById('navigationBar')))
        {
            const navRelated = new NavRelated();
            navRelated.MakeNav();
        }
        this.DeletePreviousPageComponent();
        this.createContentDiv();
    };

    private createContentDiv = async () =>
    {

        function createArticleCard(title: string, author: string, id: string)
        {
            const changePage = new ChangePage();
            const ArticleCard = document.createElement('div');

            const TitleWrapper = document.createElement('div');

            const AuthorWrapper = document.createElement('div');

            const ArticleTitle = document.createElement('h4');
            const ArticleAuthor = document.createElement('p');
            const articleId = document.createElement('input');


            ArticleTitle.onclick = () => {
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
        const contentDiv = document.createElement('div');
        const ArticleWrapper = document.createElement('div');
        const articleData = await this.getArticleData();

        for (let i = 0; i < articleData.length; i++)
        {
            const ArticleCard = createArticleCard(articleData[i].articleTitle, articleData[i].articleAuthor, articleData[i].articleId);
            ArticleWrapper.appendChild(ArticleCard);
        }

        contentDiv.appendChild(ArticleWrapper);

        document.body.appendChild(contentDiv);

    };

    async getArticleData(): Promise<{ articleTitle: string, articleAuthor: string, articleId: string; }[]>
    {
        const sendPost = new SendPost();
        const params = {};
        return await sendPost.postWithUrlParams('getArticleCardData', params).then((response) =>
        {
            if (response.code === 0)
            {
                return response.data as { articleTitle: string, articleAuthor: string, articleId: string; }[];
            }
            this.handlePopMsg.popMsg(response.message);
            throw new Error(response.message);
        }).catch((error: any) =>
        {
            console.log(error);
            throw new Error(error);
        });
    }

    DeletePreviousPageComponent = () =>
    {
        const contentDiv = document.getElementById('contentDiv');
        if (contentDiv)
        {
            contentDiv.remove();
        }
    };
}
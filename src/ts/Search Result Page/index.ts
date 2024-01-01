import { ChangePage } from "../Navigation Bar/changePage";
import { SendPost } from "../Send Fetch";

export class SearchResultPage{

    init = (keyword: string) =>
    {
        this.createContentDiv(keyword);
    };

    private createContentDiv = async (keyword: string) =>
    {
        function createArticleCard(title: string, author: string, id: string)
        {
            const ArticleCard = document.createElement('div');

            const TitleWrapper = document.createElement('div');

            const AuthorWrapper = document.createElement('div');

            const ArticleTitle = document.createElement('h4');
            const ArticleAuthor = document.createElement('p');
            const articleId = document.createElement('input');


            ArticleTitle.onclick = () =>
            {
                const changePage = new ChangePage(true);
                changePage.toArticle(id);
            };

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
        const articleData = await sendPost.getArticleDataByKeyword(keyword);
        for (let i = 0; i < articleData.length; i++)
        {
            const ArticleCard = createArticleCard(articleData[i].articleTitle, articleData[i].articleAuthor, articleData[i].articleId);
            ArticleWrapper.appendChild(ArticleCard);
        }

        contentDiv.appendChild(ArticleWrapper);

        document.body.appendChild(contentDiv);

    };

}
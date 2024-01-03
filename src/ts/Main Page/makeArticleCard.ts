import { ChangePage } from "../Navigation Bar/changePage";
import { ArticleCardData } from "../Send Fetch/interface";
import { urlconfig } from "../Url Config/config";

export class MakeArticleCard
{

    createArticleCard(ArticleCardData: ArticleCardData)
    {

        function createAuthorArea(){
            function createAvatar(){
                const avatarWrapper = document.createElement('div');
                avatarWrapper.className = 'avatarWrapper';
    
                const avatar = document.createElement('img');
                avatar.className = 'avatar';
                avatar.src = `${urlconfig.avatarUrl}${ArticleCardData.author.articleAuthorAvatar}`;
                avatar.onclick = () =>
                {
                    const changePage = new ChangePage(true);
                    changePage.toUserProfile(ArticleCardData.author.articleAuthorID.toString());
                };
                avatarWrapper.appendChild(avatar);
                return avatarWrapper;
            }
            function createAuthorStatusBar(){
                function createAuthorName(){
                    const authorNameWrapper = document.createElement('div');
                    authorNameWrapper.className = 'authorNameWrapper';
    
                    const authorName = document.createElement('p');
                    authorName.className = 'authorName';
                    authorName.innerHTML = ArticleCardData.author.articleAuthor;
                    authorName.onclick = () =>
                    {
                        const changePage = new ChangePage(true);
                        changePage.toUserProfile(ArticleCardData.author.articleAuthorID.toString());
                    };
                    authorNameWrapper.appendChild(authorName);
                    return authorNameWrapper;
                }
                function createArticleTime(){
                    const articleTimeWrapper = document.createElement('div');
                    articleTimeWrapper.className = 'articleTimeWrapper';
    
                    const articleTime = document.createElement('p');
                    articleTime.className = 'articleTime';
                    const date = new Date(ArticleCardData.article.articleLastEditTime);
                    articleTime.innerHTML = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                    articleTimeWrapper.appendChild(articleTime);
                    return articleTimeWrapper;
                }
                const authorStatusBarWrapper = document.createElement('div');
                authorStatusBarWrapper.className = 'authorStatusBarWrapper';

                const authorNameWrapper = createAuthorName();
                const articleTimeWrapper = createArticleTime();
                authorStatusBarWrapper.appendChild(authorNameWrapper);
                authorStatusBarWrapper.appendChild(articleTimeWrapper);
                return authorStatusBarWrapper;
            }
            const AuthorAreaWrapper = document.createElement('div');
            AuthorAreaWrapper.className = 'AuthorAreaWrapper';

            const avatarWrapper = createAvatar();
            const authorStatusBarWrapper = createAuthorStatusBar();
            AuthorAreaWrapper.appendChild(avatarWrapper);
            AuthorAreaWrapper.appendChild(authorStatusBarWrapper);
            return AuthorAreaWrapper;
        }

        function createTitle()
        {
            const TitleWrapper = document.createElement('div');
            TitleWrapper.className = 'TitleWrapper';

            const ArticleTitle = document.createElement('h4');
            ArticleTitle.className = 'ArticleTitle';

            ArticleTitle.onclick = () =>
            {
                const changePage = new ChangePage(true);
                changePage.toArticle(ArticleCardData.article.articleID.toString());
            };

            ArticleTitle.innerHTML = ArticleCardData.article.articleTitle;

            TitleWrapper.appendChild(ArticleTitle);
            return TitleWrapper;
        }

        function createArticleFirstLine(){
            const ArticleFirstLineWrapper = document.createElement('div');
            ArticleFirstLineWrapper.className = 'ArticleFirstLineWrapper';
            const ArticleFirstLine = document.createElement('p');
            ArticleFirstLine.className = 'ArticleFirstLine';
            ArticleFirstLine.innerHTML = ArticleCardData.article.articleFirstLine || '';
            ArticleFirstLineWrapper.appendChild(ArticleFirstLine);
            return ArticleFirstLineWrapper
        }

        function createStatusBar()
        {
            const StatusWrapper = document.createElement('div');
            StatusWrapper.className = 'StatusWrapper';

            // const ArticleAuthor = document.createElement('p');
            // ArticleAuthor.className = 'ArticleAuthor';
            // ArticleAuthor.innerHTML = ArticleCardData.author.articleAuthor;
            // ArticleAuthor.onclick = () =>
            // {
            //     const changePage = new ChangePage(true);
            //     changePage.toUserProfile(ArticleCardData.author.articleAuthorID.toString());
            // };

            const ArticleArea = document.createElement('p');
            ArticleArea.className = 'ArticleArea';
            ArticleArea.innerHTML = ArticleCardData.article.articleArea;
            ArticleArea.style.color = ArticleCardData.colorScheme.areaTextColor;
            ArticleArea.style.backgroundColor = ArticleCardData.colorScheme.areaBackgroundColor;
            ArticleArea.onclick = () =>
            {
                const changePage = new ChangePage(true);
                changePage.toArea(ArticleCardData.article.articleArea);
            };

            const ArticleLastEditTime = document.createElement('p');
            ArticleLastEditTime.className = 'ArticleLastEditTime';
            const date = new Date(ArticleCardData.article.articleLastEditTime);
            ArticleLastEditTime.innerHTML = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

            // StatusWrapper.appendChild(ArticleAuthor);
            StatusWrapper.appendChild(ArticleArea);
            StatusWrapper.appendChild(ArticleLastEditTime);

            return StatusWrapper;

        }

        const ArticleCard = document.createElement('div');
        ArticleCard.className = 'ArticleCard';


        ArticleCard.className = 'ArticleCard';


        
        const AuthorArea = createAuthorArea();
        const TitleWrapper = createTitle();
        const ArticleFirstLineWrapper = createArticleFirstLine();
        const StatusWrapper = createStatusBar();

        ArticleCard.appendChild(AuthorArea);
        ArticleCard.appendChild(TitleWrapper);
        ArticleCard.appendChild(ArticleFirstLineWrapper);
        ArticleCard.appendChild(StatusWrapper);
        return ArticleCard;
    }
}
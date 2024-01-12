import { SendPost } from "../Send Fetch";
import { HandlePopMsg } from "../Navigation Bar/popMsg";
import { ChangePage } from "../Navigation Bar/changePage";
import '../../scss/ArticlePage/index.scss';
import { ArticleContent, RetArticleData } from "../Send Fetch/interface";
export class MakeArticlePage
{
    handlePopMsg = new HandlePopMsg();

    async init()
    {
        const hash = window.location.hash;
        if (hash.startsWith('#/p'))
        {
            const id = hash.slice(hash.indexOf('?id=') + 4);
            if (id && Number.isInteger(parseInt(id)))
            {
                await this.makeArticlePage(parseInt(id));
            } else
            {

                const changePage = new ChangePage(true);

                changePage.to404Page();
            }
        } else
        {
            const changePage = new ChangePage(true);
            changePage.to404Page();
        }



    }

    private async makeArticlePage(id: number)
    {
        const site = document.body;
        if (site)
        {
            const contentDiv = document.createElement('div');
            contentDiv.id = 'contentDiv';
            contentDiv.className = 'contentDiv';
            site.appendChild(contentDiv);
            const sendPost = new SendPost();
            const data = await sendPost.getArticleContent(id);
            if(data){

                const articleWrapper = document.createElement('div');
                const articleBox = document.createElement('div');
                articleWrapper.className = 'articleWrapper'
                articleBox.className = 'articleBox';
                const articleTitle = this.createArticleTitle(data);
                const statusBar = this.createStatusBar(data);
                const articleContent = this.createArticleContent(data);
                articleBox.appendChild(articleTitle);
                articleBox.appendChild(statusBar);
                articleBox.appendChild(articleContent);
                articleWrapper.appendChild(articleBox);
                contentDiv.appendChild(articleWrapper);
            }

        }
    }

    private createArticleTitle(data:RetArticleData){
        const articleTitle = document.createElement('h2');
        articleTitle.innerText = data.article.articleTitle;
        return articleTitle;
    }

    private createStatusBar(data:RetArticleData){
        function createAuthorTab(){
            const articleAuthor = document.createElement('div');
            articleAuthor.className = 'articleAuthor';
            articleAuthor.innerText = `Author: ${data.author.articleAuthor}`;
            articleAuthor.onclick = async ()=>{
                const changePage = new ChangePage(true);
                await changePage.toUserProfile(data.author.articleAuthorID.toString());
            }
            return articleAuthor;
        }

        function createAreaTab(){
            const articleArea = document.createElement('div');
            articleArea.className = 'articleArea';
            articleArea.innerText = `Area: ${data.article.articleArea}`;
            articleArea.style.color = data.colorScheme.areaTextColor;
            articleArea.style.backgroundColor = data.colorScheme.areaBackgroundColor;
            articleArea.onclick = async ()=>{
                const changePage = new ChangePage(true);
                await changePage.toArea(data.article.articleArea);
            }
            return articleArea;
        }

        const statusBar = document.createElement('div');
        statusBar.className = 'statusBar';
        statusBar.appendChild(createAuthorTab());
        statusBar.appendChild(createAreaTab());
        return statusBar;
    }

    private createArticleContent(data:RetArticleData){
        const articleContent = document.createElement('div');
        articleContent.className = 'articleContent';
        articleContent.innerHTML = data.article.articleContent || '';
        return articleContent;
    }

}
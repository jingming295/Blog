import { NavRelated } from "../Navigation Bar";
import { SendPost } from "../Send Fetch";
import { HandlePopMsg } from "../Navigation Bar/popMsg";
import { ChangePage } from "../Navigation Bar/changePage";
import '../../scss/ArticlePage/index.scss';
export class MakeArticlePage
{
    handlePopMsg = new HandlePopMsg();

    init()
    {
        const hash = window.location.hash;
        if (hash.startsWith('#/p'))
        {
            const id = hash.slice(hash.indexOf('?id=') + 4);
            if (id && Number.isInteger(parseInt(id)))
            {
                this.makeArticlePage(id);
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

    private async makeArticlePage(id: string)
    {
        const site = document.body;
        if (site)
        {
            const contentDiv = document.createElement('div');
            contentDiv.id = 'contentDiv';
            site.appendChild(contentDiv);
            console.log(contentDiv)

            const data = await this.getArticleContent(id);
            if(data){

                const articleWrapper = document.createElement('div');

                articleWrapper.className = 'editor-content-view'

                const articleTitle = document.createElement('h1');
                articleTitle.innerText = data[0].articleTitle;
                articleWrapper.appendChild(articleTitle);

                const articleAuthor = document.createElement('h3');
                articleAuthor.innerText = data[0].articleAuthor;
                articleWrapper.appendChild(articleAuthor);

                const articleContent = document.createElement('div');
                articleContent.innerHTML = data[0].articleContent;
                articleWrapper.appendChild(articleContent);

                contentDiv.appendChild(articleWrapper);
            }

        }
    }

    private async getArticleContent(id: string)
    {
        const sendPost = new SendPost();
        const params = {
            articleId: id
        };
        return await sendPost.postWithUrlParams('getArticleContent', params).then((response) =>
        {
            console.log(response);
            if (response.code === 0)
            {
                return response.data as { articleTitle: string, articleAuthor: string, articleId: string, articleContent: string; }[];
            } else
            {
                this.handlePopMsg.popMsg(response.message);
                const changePage = new ChangePage(true);
                changePage.to404Page();
            }
        }).catch((error: any) =>
        {
            const changePage = new ChangePage(true);
            changePage.to404Page();
        });


    }
}
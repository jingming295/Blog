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
                this.makeArticlePage(parseInt(id));
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
            site.appendChild(contentDiv);
            console.log(contentDiv)
            const sendPost = new SendPost();
            const data = await sendPost.getArticleContent(id);
            if(data){

                const articleWrapper = document.createElement('div');

                articleWrapper.className = 'editor-content-view'

                const articleTitle = document.createElement('h1');
                articleTitle.innerText = data.articleTitle;
                articleWrapper.appendChild(articleTitle);

                const articleAuthor = document.createElement('h3');
                articleAuthor.innerText = data.articleAuthor;
                articleWrapper.appendChild(articleAuthor);

                const articleContent = document.createElement('div');
                articleContent.innerHTML = data.articleContent;
                articleWrapper.appendChild(articleContent);

                contentDiv.appendChild(articleWrapper);
            }

        }
    }


}
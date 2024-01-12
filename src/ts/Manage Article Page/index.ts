import { SendPost } from "../Send Fetch";
import { UserData } from "../Navigation Bar/interface";
import { HandlePopMsg } from "../Navigation Bar/popMsg";
import { ChangePage } from "../Navigation Bar/changePage";
import { UserVerification } from "../User Verification";
import { ArticleCard } from "./interface";
import '../../scss/ManageArticlePage/index.scss';
import { NavigationProgress } from "../Create Navigation Progress";

export class ManageArticle
{
    private navigationProgress = new NavigationProgress();
    handlePopMsg = new HandlePopMsg();
    async init()
    {
        this.navigationProgress.start();
        const userVerification = new UserVerification();
        if (await userVerification.verification())
        {
            this.apearManageArticle();
        }
    }

    async apearManageArticle()
    {
        const body = document.body;
        const contentDiv = document.createElement('div');
        const manageArticleWrapper = document.createElement('div');
        contentDiv.id = 'contentDiv';
        contentDiv.className = 'contentDiv';

        manageArticleWrapper.className = 'manageArticleWrapper';

        const getArticleData = async () =>
        {
            const UserData = localStorage.getItem('UserData');
            if (UserData !== null)
            {
                const parseUserData: UserData = JSON.parse(UserData);
                const sendPost = new SendPost();
                return await sendPost.getArticleDataByAuthor(parseUserData.userData.id);
            } else
            {
                localStorage.clear();
                const changePage = new ChangePage(true);
                await changePage.toIndex();
                location.reload();
            }
        };
        const ArticleData = await getArticleData();
        if (ArticleData && ArticleData.length > 0)
        {
            // const articleCardWrapper = this.appearArticleCard(ArticleData);
            const articleCardWrapper: HTMLDivElement[] = [];
            ArticleData.forEach(item =>
            {
                const articleCard = this.appearArticleCard(item);
                articleCardWrapper.push(articleCard);
            });

            articleCardWrapper.forEach(item =>
            {

                manageArticleWrapper.appendChild(item);
            });
            contentDiv.appendChild(manageArticleWrapper);
            body.appendChild(contentDiv);
            this.navigationProgress.end();
        } else
        {
            this.navigationProgress.end();
            const changePage = new ChangePage(true);
            await changePage.toIndex();
            return;
        }
    }

    appearArticleCard(articleData: ArticleCard)
    {
        const sendPost = new SendPost();
        const articleCardWrapper = document.createElement('div');
        articleCardWrapper.className = 'articleCardWrapper';

        const areaWrapper = document.createElement('div');
        const titleWrapper = document.createElement('div');
        const contentWrapper = document.createElement('div');
        const buttonWrapper = document.createElement('div');

        buttonWrapper.className = 'buttonWrapper';


        const area = document.createElement('div');

        const title = document.createElement('div');

        const content = document.createElement('div');

        const editBtn = document.createElement('div');

        const deleteBtn = document.createElement('div');


        area.innerHTML = articleData.articleArea;
        area.className = 'area';

        title.innerHTML = articleData.articleTitle;
        title.className = 'title';
        title.onclick = () => { const changePage = new ChangePage(true); changePage.toArticle(articleData.articleID.toString()); };

        content.innerHTML = articleData.p;
        content.className = 'content';

        editBtn.innerHTML = 'Edit';
        editBtn.className = 'editBtn';

        editBtn.onclick = () => { const changePage = new ChangePage(true); changePage.toEditArticle(articleData.articleID); };

        deleteBtn.innerHTML = 'Delete';
        deleteBtn.className = 'deleteBtn';
        deleteBtn.onclick = () => { sendPost.deleteArticle(articleData.articleID); };

        areaWrapper.appendChild(area);

        titleWrapper.appendChild(title);

        contentWrapper.appendChild(content);

        buttonWrapper.appendChild(editBtn);

        buttonWrapper.appendChild(deleteBtn);

        articleCardWrapper.appendChild(areaWrapper);

        articleCardWrapper.appendChild(titleWrapper);

        articleCardWrapper.appendChild(contentWrapper);

        articleCardWrapper.appendChild(buttonWrapper);

        return articleCardWrapper;
    }

}
import { SendPost } from '../Send Fetch';

import '../../scss/MainPage/index.scss';
import { MakeArticleCard } from './makeArticleCard';
export class MainPage
{
    init = () =>
    {
        this.createContentDiv();
    };

    private createContentDiv = async () =>
    {
        const sendPost = new SendPost();
        const contentDiv = document.createElement('div');
        const articleCardWrapper = document.createElement('div');
        articleCardWrapper.className = 'articleCardWrapper';
        contentDiv.id = 'contentDiv';
        contentDiv.className = 'contentDiv';
        const articleCardData = await sendPost.getArticleCardData();
        articleCardData.forEach((item) => {
            const makeArticleCard = new MakeArticleCard();
            const ArticleCard = makeArticleCard.createArticleCard(item);
            articleCardWrapper.appendChild(ArticleCard);
        })

        contentDiv.appendChild(articleCardWrapper);

        document.body.appendChild(contentDiv);

    };


}
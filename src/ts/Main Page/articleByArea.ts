import { SendPost } from "../Send Fetch";
import { MakeArticleCard } from "./makeArticleCard";

export class AreaPage
{
    init = async (area: string) =>
    {
        await this.createContentDiv(area);
    };

    private createContentDiv = async (area: string) =>
    {
        const sendPost = new SendPost();
        const contentDiv = document.createElement('div');
        const articleCardWrapper = document.createElement('div');
        articleCardWrapper.className = 'articleCardWrapper';
                
        const articleCardData = await sendPost.getArticleCardDataByArea(area);
        articleCardData.forEach((item) => {
            const makeArticleCard = new MakeArticleCard();
            const ArticleCard = makeArticleCard.createArticleCard(item);
            articleCardWrapper.appendChild(ArticleCard);
        })

        contentDiv.id = 'contentDiv';
        contentDiv.className = 'contentDiv';

        contentDiv.appendChild(articleCardWrapper);

        document.body.appendChild(contentDiv);

    };

}
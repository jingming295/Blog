import { ChangePage } from "../Navigation Bar/changePage";
import { SendPost } from "../Send Fetch";
import { MakeArticleCard } from "./makeArticleCard";

export class SearchResultPage{

    init = (keyword: string) =>
    {
        this.createContentDiv(keyword);
    };

    private createContentDiv = async (keyword: string) =>
    {

        const sendPost = new SendPost();
        const contentDiv = document.createElement('div');
        const articleCardWrapper = document.createElement('div');
        articleCardWrapper.className = 'articleCardWrapper';
        const articleCardData = await sendPost.getArticleCardDataByKeyword(keyword);
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
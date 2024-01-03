export interface RetArticleCardData{
    article: Article;
    author: author;
    colorScheme: colorScheme;
}

interface Article{
    articleID: number;
    articleTitle: string;
    articleArea: string;
    articleFirstLine: string | null;
    articleLastEditTime: Date;
}

interface author{
    articleAuthorID: number;
    articleAuthor: string;
    articleAuthorAvatar: string;
}

interface colorScheme{
    areaTextColor: string;
    areaBackgroundColor: string;
}
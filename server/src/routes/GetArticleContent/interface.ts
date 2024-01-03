export interface RetArticleData{
    article: Article;
    author: author;
    colorScheme: colorScheme;
}

interface Article{
    articleID: number;
    articleTitle: string;
    articleArea: string;
    articleContent: string | null;
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
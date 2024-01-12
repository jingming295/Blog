export interface RetArticleData{
    article: Article;
    author: author;
    colorScheme: colorScheme;
}

export interface Article{
    articleID: number;
    articleTitle: string;
    articleArea: string;
    articleContent: string | null;
    articleLastEditTime: Date;
}

export interface author{
    articleAuthorID: number;
    articleAuthor: string;
    articleAuthorAvatar: string;
}

export interface colorScheme{
    areaTextColor: string;
    areaBackgroundColor: string;
}
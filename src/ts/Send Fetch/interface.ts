export interface ArticleContent
{
    articleId: string;
    articleTitle: string;
    articleArea: string;
    articleAuthor: string;
    articleContent: string;
}

export interface ArticleCardData{
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


export interface RetArticleData{
    article: retArticleData_Article;
    author: author;
    colorScheme: colorScheme;
}

interface retArticleData_Article{
    articleID: number;
    articleTitle: string;
    articleArea: string;
    articleContent: string | null;
    articleLastEditTime: Date;
}

export interface setting_loginandregister
{
    id: number;
    allowUserRegis: number;
    emailVerification: number;
}

export interface setting_email{
    id:number;
    senderName: string | null;
    senderEmail: string | null;
    smtpServer: string | null;
    smtpPort: number | null;
    smtpUsername: string | null;
    smtpPassword: string | null;
    replyEmail: string | null;
    forceSSL: number;
}

export interface ArticleArea {
    AreaName: string;
    subArea: (string | null)[];
}

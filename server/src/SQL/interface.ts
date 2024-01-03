export interface UserResult
{
    u_id: number;
    u_class: number;
    u_name: string;
    avatar_name: string;
}

export interface UserProfile
{
    u_id: number;
    u_name: string;
    u_email: string;
    u_class: number;
    avatar_name: string;

}

export interface ArticleCardData
{
    article_id: number;
    article_title: string;
    article_area: string;
    article_content: string;
    article_lastEditTime: Date;
    article_author_id: number;
    article_author_name: string;
    article_author_avatar: string;
    cs_textColor: string;
    cs_backgroundColor: string;
}
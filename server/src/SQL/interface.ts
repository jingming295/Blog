export interface UserResult
{
    u_id: number;
    u_class: number;
    u_name: string;
    avatar_name: string;
    u_gender:number;
    u_desc:string;
    u_active: number;
}

export interface UserProfile
{
    u_id: number;
    u_name: string;
    u_email: string;
    u_class: number;
    avatar_name: string;
    u_gender:number;
    u_desc:string

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

export interface tb_setting_sendemail
{
    s_SE_id: number;
    s_SE_senderName: string|null;
    s_SE_senderEmail: string|null;
    s_SE_smtpServer: string|null;
    s_SE_smtpPort: number|null;
    s_SE_smtpUsername: string|null;
    s_SE_smtpPassword: string|null;
    s_SE_replyEmail: string|null;
    s_SE_forceSSL: number
}

export interface tb_setting_loginandregister
{
    s_LNR_id: number;
    s_LNR_allowUserRegis: number;
    s_LNR_emailVerification: number;
    s_LNR_SMTP: number;
}
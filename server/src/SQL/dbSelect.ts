import * as mysql from 'mysql2/promise';
import DatabaseConnector from './dbConnector';
import { UserResult, UserProfile, ArticleCardData, tb_setting_loginandregister, tb_setting_sendemail } from './interface';

export class DBSelect extends DatabaseConnector
{
    private _connectionPromise: Promise<mysql.Connection> | undefined;

    private get connection(): Promise<mysql.Connection>
    {
        if (!this._connectionPromise)
        {
            this._connectionPromise = this.connect();
        }
        return this._connectionPromise;
    }

    private async executeQuery<T>(query: string, values?: (string | number)[]): Promise<T[]>
    {
        const connection = await this.connection;
        try
        {
            const [rows, fields]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.query(
                query,
                values
            );
            return rows as T[];
        } finally
        {
            connection.end();
            this._connectionPromise = undefined;
        }
    }

    async login(email: string, hashedPassword: string): Promise<UserResult[]>
    {
        return this.executeQuery<UserResult>(
            `SELECT u_id, u_name, u_class, u_gender,u_desc, avatar_name, u_active FROM tb_user JOIN tb_avatar 
            WHERE u_email = ? && u_password = ? && u_avatar = avatar_id`,
            [email, hashedPassword]
        );
    }

    async selectEmail(email: string): Promise<{ u_id: number; }[]>
    {
        return this.executeQuery<{ u_id: number; }>(
            'SELECT `u_id` FROM `tb_user` WHERE `u_email` = ?',
            [email]
        );
    }


    async selectUserProfile(id: number): Promise<UserProfile[]>
    {
        return this.executeQuery<UserProfile>(
            `SELECT u_id, u_name, u_email, u_class, u_gender,u_desc, avatar_name FROM tb_user JOIN tb_avatar 
            WHERE u_id = ? && u_avatar = avatar_id`,
            [id]
        );
    }

    async selectArticleContent(articleId: string): Promise<ArticleCardData[]>
    {
        return this.executeQuery<ArticleCardData>(
            `SELECT article_id, article_title, aa_area as article_area, article_content, article_lastEditTime, 
            article_author as article_author_id, u_name as article_author_name, avatar_name as article_author_avatar, 
            cs_textColor, cs_backgroundColor
            FROM tb_article JOIN tb_user , tb_subarea, tb_colorscheme, tb_avatar
            WHERE article_id =? && article_author = u_id && article_area = aa_id && u_avatar = avatar_id && aa_colorscheme = cs_id && article_alive = 1`,
            [articleId]
        );
    }

    async selectArticleCardByID(userId: number): Promise<ArticleCardData[]>
    {
        return this.executeQuery<ArticleCardData>(
            `SELECT article_id, article_title, aa_area as article_area, article_content, article_lastEditTime, 
            article_author as article_author_id, u_name as article_author_name, avatar_name as article_author_avatar, 
            cs_textColor, cs_backgroundColor
            FROM tb_article JOIN tb_user , tb_subarea, tb_colorscheme, tb_avatar
            WHERE article_author = u_id && article_author = ? && article_area = aa_id && u_avatar = avatar_id && aa_colorscheme = cs_id && article_alive = 1
            ORDER BY article_lastEditTime DESC;`,
            [userId]
        );
    }

    /**
     * To check if the article is the author's
     * @param articleId 
     * @param userId 
     * @returns 
     */
    async selectArticleIDByItsAuthor(articleId: number, userId: number): Promise<{ article_id: string; }[]>
    {
        return this.executeQuery<{ article_id: string; }>(
            'SELECT `article_id` FROM `tb_article` WHERE article_id = ? && article_author = ? && article_alive = 1',
            [articleId, userId]
        );
    }

    async selectArticleCardData(): Promise<ArticleCardData[]>
    {
        return this.executeQuery<ArticleCardData>(
            `SELECT article_id, article_title, aa_area as article_area, article_content, article_lastEditTime, 
            article_author as article_author_id, u_name as article_author_name, avatar_name as article_author_avatar, 
            cs_textColor, cs_backgroundColor
            FROM tb_article JOIN tb_user , tb_subarea, tb_colorscheme, tb_avatar
            WHERE article_author = u_id && article_area = aa_id && u_avatar = avatar_id && aa_colorscheme = cs_id && article_alive = 1
            ORDER BY article_lastEditTime DESC;`
        );
    }

    async selectArticleCardDataByArea(area: string): Promise<ArticleCardData[]>
    {
        return this.executeQuery<ArticleCardData>(
            `SELECT article_id, article_title, aa_area as article_area, article_content, article_lastEditTime, 
            article_author as article_author_id, u_name as article_author_name, avatar_name as article_author_avatar,
            cs_textColor, cs_backgroundColor
            FROM tb_article JOIN tb_user , tb_subarea, tb_colorscheme, tb_avatar
            WHERE article_author = u_id && article_area = aa_id && u_avatar = avatar_id && aa_colorscheme = cs_id && article_alive = 1 && aa_area = ?
            ORDER BY article_lastEditTime DESC;` ,
            [area]
        );
    }

    async selectArticleCardDataByKeyword(keyword: string): Promise<ArticleCardData[]>
    {
        return this.executeQuery<ArticleCardData>(
            `SELECT article_id, article_title, aa_area as article_area, article_content, article_lastEditTime, 
            article_author as article_author_id, u_name as article_author_name, avatar_name as article_author_avatar, 
            cs_textColor, cs_backgroundColor
            FROM tb_article JOIN tb_user , tb_subarea, tb_colorscheme, tb_avatar
            WHERE article_author = u_id && article_area = aa_id && u_avatar = avatar_id && aa_colorscheme = cs_id && article_alive = 1 && article_title LIKE ?
            ORDER BY article_lastEditTime DESC;`,
            ['%' + keyword + '%']
        );
    }

    async selectSHA256(sha256: string): Promise<{ avatar_name: string; }[]>
    {
        return this.executeQuery<{ avatar_name: string; }>(
            'SELECT `avatar_name` FROM `tb_avatar` WHERE `avatar_sha256` = ?',
            [sha256]
        );
    }

    async selectSettingSendEmail(): Promise<tb_setting_sendemail[]>
    {
        return await this.executeQuery<tb_setting_sendemail>(
            `SELECT * FROM tb_setting_sendemail WHERE s_SE_id = 1`
        );
    }

    async selectSettingLoginAndRegister(): Promise<tb_setting_loginandregister[]>
    {
        return await this.executeQuery<tb_setting_loginandregister>(
            `SELECT * FROM tb_setting_loginandregister WHERE s_LNR_id = 1`
        );
    }

    async selectUserActiveStatusByID(id: number): Promise<{ u_active: number; }[]>
    {
        return await this.executeQuery<{ u_active: number; }>(
            `SELECT u_active FROM tb_user WHERE u_id = ?`,
            [id]
        );
    }

    async selectUserIDStatusByToken(token: string): Promise<{ u_id: number; u_active: number; }[]>
    {
        return await this.executeQuery<{ u_id: number; u_active: number; }>(
            `SELECT u_id, u_active FROM tb_user WHERE u_token = ?`,
            [token]
        );
    }

    async selectAllArticleArea()
    {
        return await this.executeQuery<{ ba_id: number, ba_name: string, aa_id: number, aa_area: string, cs_id: number, cs_textColor: string, cs_backgroundColor: string; }>(
            `SELECT tb_bigarea.ba_id, tb_bigarea.ba_name, tb_subarea.aa_id, tb_subarea.aa_area, tb_subarea.aa_colorscheme,tb_colorscheme.cs_id, tb_colorscheme.cs_textColor, tb_colorscheme.cs_backgroundColor
            FROM tb_bigarea
            LEFT JOIN tb_subarea
            ON tb_bigarea.ba_id = tb_subarea.bigarea AND tb_subarea.aa_alive = 1
            LEFT JOIN tb_colorscheme
            ON tb_subarea.aa_colorscheme = tb_colorscheme.cs_id
            WHERE tb_bigarea.ba_alive = 1
            ORDER BY tb_bigarea.ba_id, tb_subarea.aa_id;
            
                  
            `
        );
    }
    async selectAllColorScheme()
    {
        return await this.executeQuery<{ cs_id: number; cs_textColor: string; cs_backgroundColor: string; }>(
            `SELECT cs_id, cs_textColor, cs_backgroundColor FROM tb_colorscheme WHERE cs_alive = 1`
        );
    }

    async checkColorSchemeConstraint(id: number)
    {
        return await this.executeQuery<{ aa_colorscheme: number; }>(
            `SELECT tb_subarea.*, tb_colorscheme.*
            FROM tb_subarea
            LEFT JOIN tb_colorscheme ON tb_subarea.aa_colorscheme = tb_colorscheme.cs_id
            WHERE tb_colorscheme.cs_id = ? AND tb_subarea.aa_alive = 1;
            `,
            [id]
        );
    }

    async selectAllArticleBigArea()
    {
        return await this.executeQuery<{ ba_id: number; ba_name: string; }>(
            `SELECT * FROM tb_bigarea WHERE ba_alive = 1`
        );
    }

    async checkBigAreaConstraint(id: number)
    {
        return await this.executeQuery<{ aa_area: number; }>(
            `SELECT tb_bigarea.ba_id
            FROM tb_bigarea
            JOIN tb_subarea ON tb_bigarea.ba_id = tb_subarea.bigarea
            WHERE tb_subarea.aa_alive = 1 AND tb_bigarea.ba_id = ?;            
            `,
            [id]
        );
    }

    async selectBigAreaByID(id: number)
    {
        return await this.executeQuery<{ ba_id: number; ba_name: string; }>(
            `SELECT * FROM tb_bigarea WHERE ba_id = ?`,
            [id]
        );
    }

    async selectSubAreaByID(id: number)
    {
        return await this.executeQuery<{ aa_id: number; aa_area: string; aa_colorscheme: number; }>(
            `SELECT * FROM tb_subarea WHERE aa_id = ?`,
            [id]
        );
    }

    async selectColorSchemeByID(id: number)
    {
        return await this.executeQuery<{ cs_id: number; cs_textColor: string; cs_backgroundColor: string; }>(
            `SELECT * FROM tb_colorscheme WHERE cs_id = ?`,
            [id]
        );
    }

    async checkSubAreaConstraint(id: number)
    {
        return await this.executeQuery<{ aa_area: number; }>(
            `SELECT tb_subarea.aa_id
            FROM tb_subarea
            INNER JOIN tb_article
            ON tb_subarea.aa_id = tb_article.article_area
            WHERE tb_subarea.aa_id = ? AND tb_article.article_alive = 1;                     
            `,
            [id]
        );
    }

}

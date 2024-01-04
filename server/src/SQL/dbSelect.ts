import * as mysql from 'mysql2/promise';
import DatabaseConnector from './dbConnector';
import { UserResult, UserProfile, ArticleCardData } from './interface';

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
        }
    }

    async login(email: string, hashedPassword: string): Promise<UserResult[]>
    {
        return this.executeQuery<UserResult>(
            `SELECT u_id, u_name, u_class, u_gender,u_desc, avatar_name FROM tb_user JOIN tb_avatar 
            WHERE u_email = ? && u_password = ? && u_avatar = avatar_id`,
            [email, hashedPassword]
        );
    }

    async selectEmail(email: string): Promise<{ id: string; }[]>
    {
        return this.executeQuery<{ id: string; }>(
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
            FROM tb_article JOIN tb_user , tb_articlearea, tb_colorscheme, tb_avatar
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
            FROM tb_article JOIN tb_user , tb_articlearea, tb_colorscheme, tb_avatar
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
            FROM tb_article JOIN tb_user , tb_articlearea, tb_colorscheme, tb_avatar
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
            FROM tb_article JOIN tb_user , tb_articlearea, tb_colorscheme, tb_avatar
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
            FROM tb_article JOIN tb_user , tb_articlearea, tb_colorscheme, tb_avatar
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

}

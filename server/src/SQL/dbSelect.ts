import * as mysql from 'mysql2/promise';
import DatabaseConnector from './dbConnector';
import { UserResult, UserProfile } from './interface';

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
            'SELECT `u_id`, `u_class`, `u_name`, `avatar_name` FROM `tb_user` JOIN tb_avatar WHERE `u_email` = ? && `u_password` = ?',
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
            'SELECT `u_id`, `u_name`, `u_email`, `u_name`, `u_class`, `avatar_name` FROM `tb_user` JOIN tb_avatar WHERE `u_id` = ?',
            [id]
        );
    }

    async selectArticleCardData(): Promise<{ article_id: string, article_title: string, u_name: string; }[]>
    {
        return this.executeQuery<{ article_id: string, article_title: string, u_name: string; }>(
            'SELECT `article_id`, `article_title`, `u_name` FROM `tb_article` JOIN tb_user WHERE article_author = u_id && article_alive = 1'
        );
    }

    async selectArticleContent(articleId: string): Promise<{ article_id: string, article_title: string, article_area:string, u_name: string, article_content: string; }[]>
    {
        return this.executeQuery<{ article_id: string, article_title: string, article_area:string, u_name: string, article_content: string; }>(
            'SELECT `article_id`, `article_title`,`article_area`, `u_name`, `article_content` FROM `tb_article` JOIN tb_user WHERE article_id = ? && article_author = u_id  && article_alive = 1',
            [articleId]
        );
    }

    async selectArticleCardByID(userId: number): Promise<{ article_id: string, article_title: string, article_area:string, article_content: string, u_name: string; }[]>
    {
        return this.executeQuery<{ article_id: string, article_title: string, article_area:string, article_content: string, u_name: string; }>(
            'SELECT `article_id`, `article_title`, `article_content`, `u_name`, `article_area` FROM `tb_article` JOIN tb_user WHERE article_author = u_id && article_author = ? && article_alive = 1',
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
}

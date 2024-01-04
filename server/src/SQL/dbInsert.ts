import * as mysql from 'mysql2/promise';
import DatabaseConnector from './dbConnector';
import { ResultSetHeader } from 'mysql2/promise';

export class DBInsert extends DatabaseConnector
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

    private async executeQuery(query: string, values: (string|number)[]): Promise<ResultSetHeader>
    {
        const connection = await this.connection;
        try
        {
            const [ResultSetHeader, fields]: [mysql.ResultSetHeader, mysql.FieldPacket[]] = await connection.query(
                query,
                values
            );
            return ResultSetHeader;
        } finally
        {
            connection.end();
        }
    }

    async Register(username: string, email: string, hashedPassword: string): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            'INSERT INTO `tb_user`(`u_name`, `u_email`, `u_password`, `u_class`, `u_active`) VALUES (?,?,?,0,1)',
            [username, email, hashedPassword]
        );
    }

    async postArticle(title: string, content: string, area: string, tag: string, userID: number): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            `INSERT INTO tb_article(article_title, article_content, article_area, article_tag, article_author) 
            VALUES (?, ?, (SELECT aa_id FROM tb_articlearea WHERE aa_area = ?), ?, ?);
            `,
            [title, content, area, tag, userID]
        );
    }

    async insertAvatar(avatarName: string, sha256:string): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            'INSERT INTO `tb_avatar`( `avatar_name`, `avatar_sha256`) VALUES (?,?)',
            [avatarName, sha256]
        );
    }
    
}

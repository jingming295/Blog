import * as mysql from 'mysql2/promise';
import DatabaseConnector from './dbConnector';
import { ResultSetHeader } from 'mysql2/promise';

export class DBUpdate extends DatabaseConnector
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

    async DeleteArticle(articleID:number): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            'UPDATE `tb_article` SET `article_alive`=0 WHERE `article_id` = ?',
            [articleID]
        );
    }

    async updateArticle(articleID:number, title: string, content: string, area: string, tag: string): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            'UPDATE `tb_article` SET `article_title` = ?, `article_content` =? , `article_area` = ?, `article_tag` = ? WHERE `article_id` = ?',
            [title, content, area, tag, articleID]
        );
    }
    
}

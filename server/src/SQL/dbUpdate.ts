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
            `UPDATE tb_article
            SET article_title = ?, article_content = ?, article_area = (
                SELECT aa_id
                FROM tb_articlearea
                WHERE aa_area = ?
            ), article_tag = ?,
            article_lastEditTime = CURRENT_TIMESTAMP
            WHERE article_id = ?`,
            [title, content, area, tag, articleID]
        );
    }

    async updateAvatar(userID: number, avatarName: string): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            `UPDATE tb_user 
            INNER JOIN tb_avatar ON tb_avatar.avatar_name = ? 
            SET tb_user.u_avatar = tb_avatar.avatar_id 
            WHERE tb_user.u_id = ?;
            `,
            [avatarName, userID]
        );
    }

    async updateUserProfile(id:number, newUserName:string, newGender:number, newDescription:string){
        return this.executeQuery(
            `UPDATE tb_user 
            SET u_name = ?, u_gender =?, u_desc = ? 
            WHERE u_id = ?;
            `,
            [newUserName, newGender, newDescription, id]
        );
    }
    async updateUserPassword(id:number, newPassword:string){
        return this.executeQuery(
            `UPDATE tb_user 
            SET u_password = ? 
            WHERE u_id = ?;
            `,
            [newPassword, id]
        );
    }
}

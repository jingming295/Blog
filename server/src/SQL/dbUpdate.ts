import * as mysql from 'mysql2/promise';
import DatabaseConnector from './dbConnector';
import { ResultSetHeader } from 'mysql2/promise';
import { tb_setting_sendemail } from './interface';

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

    private async executeQuery(query: string, values: (string|number|null)[]): Promise<ResultSetHeader>
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
            this._connectionPromise = undefined;
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
                FROM tb_subarea
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

    async updateUserLoginAndRegisterSettings(id: number, s_LNR_allowUserRegis: number, s_LNR_emailVerification:number): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            `UPDATE tb_setting_loginandregister 
            SET s_LNR_allowUserRegis = ? , s_LNR_emailVerification = ?
            WHERE s_LNR_id = ?;
            `,
            [s_LNR_allowUserRegis, s_LNR_emailVerification, id]
        );
    }

    async updateEmailSettings(EmailSettings: tb_setting_sendemail): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            `UPDATE tb_setting_sendemail 
            SET s_SE_senderName = ?, s_SE_senderEmail = ?, s_SE_smtpServer = ?, s_SE_smtpPort = ?, s_SE_smtpUsername = ?, s_SE_smtpPassword = ?, s_SE_replyEmail = ?, s_SE_forceSSL = ?
            WHERE s_SE_id = ?;
            `,
            [EmailSettings.s_SE_senderName, EmailSettings.s_SE_senderEmail, EmailSettings.s_SE_smtpServer, EmailSettings.s_SE_smtpPort, EmailSettings.s_SE_smtpUsername, EmailSettings.s_SE_smtpPassword, EmailSettings.s_SE_replyEmail, EmailSettings.s_SE_forceSSL, EmailSettings.s_SE_id]
        );
    }

    async updateUserToken(id: number, token: string): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            `UPDATE tb_user 
            SET u_token = ?
            WHERE u_id = ?;
            `,
            [token, id]
        );
    }

    async updateUserActiveStatusByID(id: number): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            `UPDATE tb_user 
            SET u_active = 1, u_token = NULL
            WHERE u_id = ?;
            `,
            [id]
        );
    }

    async deleteColorScheme(id:number): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            `UPDATE tb_colorscheme
            SET cs_alive = 0
            WHERE cs_id = ?;
            `,
            [id]
        );
    }

    async deleteBigArea(id:number): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            `UPDATE tb_bigarea
            SET ba_alive = 0
            WHERE ba_id = ?;
            `,
            [id]
        );
    }
    async updateBigArea(id:number, name:string): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            `UPDATE tb_bigarea
            SET ba_name = ?
            WHERE ba_id = ?;
            `,
            [name, id]
        );
    }

    async updateSubAreaData(id:number, name:string, bigAreaID:number, colorSchemeID:number): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            `UPDATE tb_subarea
            SET aa_area = ?, bigarea = ?, aa_colorscheme = ?
            WHERE aa_id = ?;
            `,
            [name, bigAreaID, colorSchemeID, id]
        );
    }

    async deleteSubArea(id:number): Promise<ResultSetHeader>{
        return this.executeQuery(
            `UPDATE tb_subarea
            SET aa_alive = 0
            WHERE aa_id = ?;
            `,
            [id]
        );
    }
}

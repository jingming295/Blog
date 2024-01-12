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
            this._connectionPromise = undefined;
        }
    }

    async Register(username: string, email: string, hashedPassword: string, token:string|null=null): Promise<ResultSetHeader>
    {
        if(token){
            return this.executeQuery(
                'INSERT INTO `tb_user`(`u_name`, `u_email`, `u_password`, `u_class`, `u_active`, `u_token`) VALUES (?,?,?,0,0,?)',
                [username, email, hashedPassword, token]
            );
        }else {
            return this.executeQuery(
                'INSERT INTO `tb_user`(`u_name`, `u_email`, `u_password`, `u_class`, `u_active`) VALUES (?,?,?,0,1)',
                [username, email, hashedPassword]
            );
        }

    }

    async postArticle(title: string, content: string, area: string, tag: string, userID: number): Promise<ResultSetHeader>
    {
        return this.executeQuery(
            `INSERT INTO tb_article(article_title, article_content, article_area, article_tag, article_author) 
            VALUES (?, ?, (SELECT aa_id FROM tb_subarea WHERE aa_area = ?), ?, ?);
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

    async insertDefaultSettingSendEmail(){
        return this.executeQuery(
            `INSERT INTO tb_setting_sendemail (s_SE_id) 
            VALUES ('1');
            `,
            []
        );
    }

    async insertDefaultSettingLoginAndRegister(){
        return this.executeQuery(
            `INSERT INTO tb_setting_loginandregister (s_LNR_id) 
            VALUES ('1');
            `,
            []
        );
    }

    async addColorScheme(textColor: string, backgroundColor: string): Promise<ResultSetHeader>{
        return this.executeQuery(
            `INSERT INTO tb_colorscheme (cs_textColor, cs_backgroundColor) 
            VALUES (?, ?);
            `,
            [textColor, backgroundColor]
        );
    }

    async addBigArea(name: string): Promise<ResultSetHeader>{
        return this.executeQuery(
            `INSERT INTO tb_bigarea (ba_name) 
            VALUES (?);
            `,
            [name]
        );
    }

    async addSubArea(name: string, bigAreaID: number, colorSchemeID: number): Promise<ResultSetHeader>{
        return this.executeQuery(
            `INSERT INTO tb_subarea (aa_area, bigarea, aa_colorscheme) 
            VALUES (?, ?, ?);
            `,
            [name, bigAreaID, colorSchemeID]
        );
    }
    
}

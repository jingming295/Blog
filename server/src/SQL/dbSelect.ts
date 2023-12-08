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

    /**
     * return user id, class, name
     * @param email email of user
     * @param hashedPassword hashed password after salt
     * @returns 
     */
    async login(email: string, hashedPassword: string): Promise<UserResult[]>
    {
        const connection = await this.connection;
        const [rows, fields]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.query(
            'SELECT `u_id`, `u_class`, `u_name`, `avatar_name` FROM `tb_user` JOIN tb_avatar WHERE `u_email` = ? && `u_password` = ?',
            [email, hashedPassword]
        );
        return rows as UserResult[];
    }

    async selectEmail(email: string): Promise<{ id: string; }[]>
    {
        const connection = await this.connection;
        const [rows, fields]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.query(
            'SELECT `u_id` FROM `tb_user` WHERE `u_email` = ?',
            [email]
        );
        return rows as { id: string; }[];
    }

    async selectUserProfile(id: number)
    {
        const connection = await this.connection;
        const [rows, fields]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.query(
            'SELECT `u_id`, `u_name`, `u_email`, `u_name`, `u_class`, `avatar_name` FROM `tb_user` JOIN tb_avatar WHERE `u_id` = ?',
            [id]
        );
        return rows as UserProfile[];
    }
}

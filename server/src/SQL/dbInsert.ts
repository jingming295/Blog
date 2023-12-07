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

    async Register(username: string, email: string, hashedPassword: string): Promise<ResultSetHeader>
    {
        const connection = await this.connection;
        const [ResultSetHeader, fields]: [mysql.ResultSetHeader, mysql.FieldPacket[]] = await connection.query(
            'INSERT INTO `tb_user`(`u_name`, `u_email`, `u_password`, `u_class`, `u_active`) VALUES (?,?,?,0,1)',
            [username, email, hashedPassword]
        );
        return ResultSetHeader;
    }
}
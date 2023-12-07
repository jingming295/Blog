// dbConnector.ts

import * as mysql from 'mysql2/promise';

class DatabaseConnector
{
  protected async connect()
  {
    const connection = await mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'blog'
    });

    return connection
  }
}

export default DatabaseConnector;

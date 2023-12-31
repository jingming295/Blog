// dbConnector.ts

import * as mysql from 'mysql2/promise';
import { dbConfig } from './SQLConfig';

class DatabaseConnector
{
  protected async connect()
  {
    const connection = await mysql.createConnection(dbConfig)

    return connection
  }
}

export default DatabaseConnector;

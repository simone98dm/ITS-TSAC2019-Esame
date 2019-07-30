
import { IDbConnection } from '../models/dbconnection';
import { Pool } from 'pg';
import * as connectionConfigs from '../configs/pg.config';

export class PgConnection implements IDbConnection {
  private _poolConnection: Pool;

  constructor() {
    this._poolConnection = new Pool(connectionConfigs);
  }

  public query(sql: string, params?: any[]): any {
    try {
      return this._poolConnection
        .connect()
        .then(client => {
          return client
            .query(sql, params)
            .then(res => {
              client.release();
              return res;
            })
            .catch(e => {
              client.release();
              throw new Error(e);
            });
        })
        .catch(err => {
          throw err;
        });
    } catch (error) {
      console.error(error);
    }
  }
}


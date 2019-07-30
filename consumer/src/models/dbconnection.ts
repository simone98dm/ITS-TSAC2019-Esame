export interface IDbConnection {
  query(sql: string, params: any[]): any;
}


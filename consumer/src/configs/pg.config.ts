import dotenv from 'dotenv';
dotenv.config();
const user: string = process.env.PG_USERNAME || 'simone';
const password: string = process.env.PG_PASSWORD || '';
const database: string = process.env.PG_DATABASE || '';
const host: string = process.env.PG_HOSTNAME || 'localhost';
const port: number = Number(process.env.PG_PORT) || 5432;

export { user, password, database, host, port };


import dotenv from 'dotenv';
dotenv.config();
const prefix = '/api';
const port = process.env.API_PORT || 3400;

export { port, prefix };


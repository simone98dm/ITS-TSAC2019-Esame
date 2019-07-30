import dotenv from 'dotenv';
dotenv.config();
const hostname: string = process.env.QUEUE_HOSTNAME || 'localhost';
const protocol: string = 'amqp://';
const username: string = process.env.QUEUE_USERNAME || 'simone';
const password: string = process.env.QUEUE_PASSWORD || '';
const port: number = Number(process.env.QUEUE_PORT) || 5672;
const wq: string = 'mesuraments_wq';
const getConnectionString = () => {
  return 'amqp://' + username + ':' + password + '@' + hostname + ':' + port;
};
export {
  hostname,
  protocol,
  port,
  username,
  password,
  getConnectionString,
  wq
};

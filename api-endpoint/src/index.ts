import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { port, prefix } from './configs/api.config';
import * as conveyorsRoutes from './routes/conveyor.route';

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(prefix, conveyorsRoutes.router);

server.listen(port, () =>
  console.log('API-ENDPOINT are running (:' + port + ')')
);

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { port, prefix } from './configs/api.config';
import * as conveyorRoutes from './routes/conveyor.route';

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(prefix, conveyorRoutes.router);

server.listen(port, () => console.log('STORE-ENDPOINT is running (:'+port+')'));

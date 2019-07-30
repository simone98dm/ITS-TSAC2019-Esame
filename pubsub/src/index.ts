import http from 'http';
import express from 'express';
const app = express();
import { port } from './configs/api.config';
import { RabbitQueue } from './drivers/rabbitmq.driver';
const rb = new RabbitQueue();

const server = http.createServer(app);
const io = require('socket.io').listen(server);

server.listen(port, () => console.log(`PUB/SUB waiting connections (:${port})`));

io.on('connection', function(socket) {
  console.log('Connected succesfully to the socket ...');
  rb.setup()
    .then(connection => {
      rb.consume(connection, socket);
    })
    .catch(err => {
      console.log(err);
    });
});

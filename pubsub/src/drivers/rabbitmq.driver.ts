import { IQueue } from '../models/queue';
import amqp from 'amqplib';
import { getConnectionString, ps } from '../configs/rabbitmq.config';

export class RabbitQueue implements IQueue {
  constructor() {}

  async setup() {
    return await amqp.connect(getConnectionString());
  }

  async consume(connection, socket) {
    try {
      await connection
        .createChannel()
        .then(async channel => {
          channel.assertExchange(ps, 'fanout', { durable: false });
          await channel
            .assertQueue('', { exclusive: true }) // change pubsub with ''
            .then(async q => {
              channel.bindQueue(q.queue, ps, '');
              await channel.consume(
                q.queue,
                msg => {
                  if (msg.content) {
                    console.log('    [x] %s', msg.content.toString());
                    socket.emit(
                      'alert',
                      JSON.stringify(msg.content.toString())
                    );
                  }
                },
                { noAck: true }
              );
            })
            .catch(err => {
              throw err;
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

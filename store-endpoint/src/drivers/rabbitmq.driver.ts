import { IQueue } from '../models/queue';
import amqp from 'amqplib';
import { getConnectionString, wq, ps } from '../configs/rabbitmq.config';

export class RabbitQueue implements IQueue {
  private connection;
  constructor() {}

  async setup() {
    this.connection = await amqp
      .connect(getConnectionString())
      .then(result => result)
      .catch(err => {
        console.error(err);
      });
  }

  async addItemToWorkingQueue(item: any) {
    try {
      await amqp
        .connect(getConnectionString())
        .then(async connection => {
          let channel = await connection.createChannel();
          await channel.assertQueue(wq, { durable: true });
          await channel.sendToQueue(wq, Buffer.from(JSON.stringify(item)), {
            persistent: true
          });
          console.log('[+] Add item to ' + wq + ' (%s)', JSON.stringify(item));
        })
        .catch(err => {
          throw err;
        });
    } catch (error) {
      console.error(error);
    }
  }

  async addItemToPublishSubscribeQueue(item: any) {
    try {
      await amqp
        .connect(getConnectionString())
        .then(async connection => {
          let msg = JSON.stringify(item);
          let channel = await connection.createChannel();
          channel.assertExchange(ps, 'fanout', { durable: false });
          channel.publish(ps, '', Buffer.from(msg));
          console.log('[+] Add item to ' + ps + '  (%s)', msg);
        })
        .catch(err => {
          throw err;
        });
    } catch (error) {
      console.error(error);
    }
  }
}

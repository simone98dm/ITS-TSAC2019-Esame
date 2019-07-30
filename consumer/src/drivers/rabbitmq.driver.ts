import { IQueue } from '../models/queue';
import amqp from 'amqplib';
import { getConnectionString, wq } from '../configs/rabbitmq.config';
import { IMeasurement } from '../models/measurement';
import { storeData } from '../controllers/conveyor..controller';

export class RabbitQueue implements IQueue {
  private connection;
  constructor() {}

  async setup() {
    return await amqp
      .connect(getConnectionString())
      .then(result => result)
      .catch(err => {
        console.error(err);
      });
  }

  async consume(connection: any) {
    try {
      const channel = await connection.createChannel();

      channel.assertQueue(wq, { durable: true });
      channel.prefetch(1);
      await channel.consume(
        wq,
        async msg => {
          let location: IMeasurement = JSON.parse(msg.content.toString());
          console.log('[!] Receive ' + msg.content.toString());
          await storeData(location);
          channel.ack(msg);
        },
        { noAck: false }
      );
    } catch (error) {
      console.error(error);
    }
  }
}

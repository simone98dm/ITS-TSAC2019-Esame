import { RabbitQueue } from './drivers/rabbitmq.driver';

const rb = new RabbitQueue();
rb.setup();
try {
  rb.setup()
    .then(connection => {
      console.log('[!] Consumer ready to consume...');
      rb.consume(connection);
    })
    .catch(err => {
      throw err;
    });
} catch (error) {
  console.error(error);
}

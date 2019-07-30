import { RabbitQueue } from '../drivers/rabbitmq.driver';
import { IMeasurement } from '../models/measurement';
const rb = new RabbitQueue();
rb.setup();

async function sendPayload(data: IMeasurement) {
  await rb.addItemToWorkingQueue(data);
  if (Number(data.consume) > 40) await rb.addItemToPublishSubscribeQueue(data);
}

export { sendPayload };

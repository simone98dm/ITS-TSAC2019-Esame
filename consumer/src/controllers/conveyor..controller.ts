import { IMeasurement } from '../models/measurement';
import { PgConnection } from '../drivers/pg.driver';

const dbConnection = new PgConnection();

async function storeData(data: IMeasurement) {
  if (!(await conveyorExist(data.id))) {
    await createNewConveyor(data.id);
  }
  return await store(data);
}

async function store(data) {
  return await dbConnection
    .query(
      `INSERT INTO measurements (fk_id_conveyor, speed, consume) VALUES ($1,$2,$3)`,
      [data.id, data.speed, data.consume]
    )
    .then(result => {
      return result.insertedId != null;
    })
    .catch(err => {
      console.error(err);
    });
}

async function conveyorExist(id: number) {
  return await dbConnection
    .query(`SELECT id FROM conveyors WHERE id=$1`, [id])
    .then(result => result.rows.length > 0)
    .catch(err => console.error(err));
}

async function createNewConveyor(id: number) {
  return await dbConnection
    .query(`INSERT INTO conveyors (id) VALUES ($1)`, [id])
    .then(result => console.log(' [+] added new conveyor'))
    .catch(err => console.error(err));
}

export { storeData };

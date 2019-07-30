import { PgConnection } from '../drivers/pg.driver';
const conn = new PgConnection();

async function getConveyors() {
  return await conn
    .query(
      'SELECT speed, consume, create_date, conveyors.id as id, description FROM measurements JOIN conveyors ON fk_id_conveyor=conveyors.id ORDER BY create_date DESC'
    )
    .then(result => {
      let x: any[] = [];

      result.rows.map(row => {
        if (!onlyUnique(row, x)) {
          x.push({
            speed: row.speed,
            consume: row.consume,
            date: row.create_date,
            id: { id: row.id, description: row.description }
          });
        }
      });
      return x;
    })
    .catch(err => console.error(err));
}

function onlyUnique(obj, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id.id === obj.id) {
      return true;
    }
  }
  return false;
}

async function getConveyor(id: number) {
  return await conn
    .query(
      'SELECT speed, consume, create_date as date FROM measurements JOIN conveyors ON fk_id_conveyor=conveyors.id WHERE conveyors.id=$1 ORDER BY create_date DESC',
      [id]
    )
    .then(result => result.rows)
    .catch(err => console.error(err));
}

export { getConveyors, getConveyor };

#!/bin/bash

mkdir -p src
mkdir -p src/controllers
mkdir -p src/routes
mkdir -p src/configs

touch src/controllers/$(echo $1).controller.ts
echo -e "import { PgConnection } from '../drivers/pg.driver';
const conn = new PgConnection();

async function get"$(echo $1)"s() {
  return await conn
    .query('SELECT * FROM')
    .then(result => result)
    .catch(err => console.error(err));
}

async function get"$(echo $1)"(id: string) {
  return await conn
    .query('SELECT * FROM', [id])
    .then(result => result)
    .catch(err => console.error(err));
}
" > src/controllers/$(echo $1).controller.ts

touch src/routes/$(echo $1).route.ts
echo -e "import express from 'express';
import { prefix } from '../configs/"$(echo $1)".config';

const router = express.Router();

router.get(prefix, async (req, res) => {
  return res.status(200).json().end();
});
router.get(prefix + '/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(404).end();
  }
  return res.status(200).json().end();
});
router.post(prefix, async (req, res) => {
  if (!req.body) {
    return res.status(404).end();
  }
  return res.status(200).json().end();
});
router.put(prefix, async (req, res) => {});
router.delete(prefix, async (req, res) => {});

export { router };
" > src/routes/$(echo $1).route.ts

touch src/configs/$(echo $1).config.ts
echo -e "
const prefix = '/"$(echo $1)"';

export { prefix };
" > src/configs/$(echo $1).config.ts



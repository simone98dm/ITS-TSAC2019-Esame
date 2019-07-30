import express from 'express';
import { prefix } from '../configs/conveyor.config';
import { getConveyors, getConveyor } from '../controllers/conveyor.controller';

const router = express.Router();

router.get(prefix, async (req, res) => {
  return res
    .status(200)
    .json(await getConveyors())
    .end();
});
router.get(prefix + '/:id', async (req, res) => {
  const id: number = Number(req.params.id);
  if (!id) {
    return res.status(404).end();
  }
  return res
    .status(200)
    .json(await getConveyor(id))
    .end();
});
router.post(prefix, (req, res) => {
  if (!req.body) {
    return res.status(404).end();
  }
  return res
    .status(200)
    .json()
    .end();
});

router.put(prefix, (req, res) => {});
router.delete(prefix, (req, res) => {});

export { router };

import express from 'express';
import { prefix } from '../configs/conveyor.config';
import { sendPayload } from '../controllers/conveyor.controller';

const router = express.Router();

router.post(prefix, async (req, res) => {
  if (!req.body.data) {
    return res.status(400).end();
  }
  return res
    .status(200)
    .json(await sendPayload(req.body.data))
    .end();
});

export { router };

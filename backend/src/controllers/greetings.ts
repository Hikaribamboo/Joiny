import express, { Router } from 'express';

const router: Router = express.Router();

const greetings = [
  { id: 0, greeting: 'Hello!' },
  { id: 1, greeting: 'Nice to meet you!' },
];

router.get('/', (req, res) => {
  res.send(greetings);
});

router.post('/', (req, res) => {
  greetings.push(req.body);
  res.send(greetings);
});

export default router; 
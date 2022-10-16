const cors = require('cors');
import dotenv from 'dotenv';
import express from 'express';
import {Request, Response} from 'express-serve-static-core';
import {TokenManager} from './Token';
import {wait_ms} from './utils';

dotenv.config();

const app = express();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send(`You probably shouldn't be here...`);
});

app.get('/login', async (req, res) => {
  await wait_ms(1000);

  const params = req.query;
  if (params.username && typeof (params.username) === 'string') {
    if (params.password && typeof (params.password) === 'string') {
      const token = TokenManager.Generate("dajack05@gmail.com");

      TokenManager.Verify(token);

      res.send(token);

      return;
    }
  }
  res.send('Nope');
});

app.listen(process.env.PORT, () => {
  console.log('Let\'s a-go!!!');
});
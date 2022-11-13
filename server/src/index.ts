const cors = require('cors');
import dotenv from 'dotenv';
import express from 'express';
import {Request, Response} from 'express-serve-static-core';
import body_parser from 'body-parser';
import {LoginHandler} from './handlers/LoginHandler';
import {GetUser, UpdateUser, CreateUser, RemoveUser} from './handlers/UserHandler';
import {CreateGroup, GetGroup, RemoveGroup, UpdateGroup} from './handlers/GroupHandler';
import{SendEmail} from './mail/Mail'
import { SendWelcomeEmail } from './handlers/MailHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(body_parser.json());

app.get('/', (req: Request, res: Response) => {
  res.send(`You probably shouldn't be here...`);
});

app.post('/login', async (req, res) => res.send(await LoginHandler(req)));

app.get('/user', async (req, res) => res.send(await GetUser(req)));
app.post('/user', async (req, res) => res.send(await UpdateUser(req)));
app.put('/user', async (req, res) => res.send(await CreateUser(req)));
app.delete('/user', async (req, res) => res.send(await RemoveUser(req)));

app.get('/group', async (req, res) => res.send(await GetGroup(req)));
app.post('/group', async (req, res) => res.send(await UpdateGroup(req)));
app.put('/group', async (req, res) => res.send(await CreateGroup(req)));
app.delete('/group', async (req, res) => res.send(await RemoveGroup(req)));

app.post('/mail/welcome', async (req,res) => res.send(await SendWelcomeEmail(req)));

app.listen(process.env.PORT, () => {
  console.log('Let\'s a-go!!! Running on port ' + process.env.PORT);
});

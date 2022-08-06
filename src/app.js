import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import urlsRouter from './routes/urlsRouter.js';
import usersRouter from './routes/usersRouter.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(authRouter);
app.use(urlsRouter);
app.use(usersRouter);

app.listen(process.env.PORT);
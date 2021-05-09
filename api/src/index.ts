import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectToDb } from './db';
import { apiRouter } from './routes';

dotenv.config();

connectToDb();

const app = express();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.use(express.json())
    .use(cors({ origin: [`${HOST}:${PORT}`, `http://37.193.142.197`] }))
    .use('/api', apiRouter)
    .listen(process.env.API_PORT, () => {
        console.log(
            `Api express-server started on ${HOST}:${process.env.API_PORT}`
        );
    });

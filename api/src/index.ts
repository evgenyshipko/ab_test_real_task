import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectToDb } from './db';
import { apiRouter } from './routes';

dotenv.config();

connectToDb();

const app = express();

app.use(express.json())
    .use(cors({ origin: `${process.env.HOST}:${process.env.PORT}` }))
    .use('/api', apiRouter)
    .listen(process.env.API_PORT, () => {
        console.log(
            `Api express-server started on ${process.env.HOST}:${process.env.API_PORT}`
        );
    });

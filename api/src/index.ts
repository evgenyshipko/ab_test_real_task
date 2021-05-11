import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectToDb } from './db';
import { apiRouter } from './routes';
import { IS_DEV } from './env';

dotenv.config();

connectToDb();

const app = express();

const HOST = IS_DEV ? 'http://localhost' : process.env.HOST;
const PORT = process.env.PORT;

app.use(express.json())
    .use(cors({ origin: [`${HOST}:${PORT}`, HOST] }))
    .use('/api', apiRouter)
    .listen(process.env.API_PORT, () => {
        console.log(
            `Api express-server started on ${HOST}:${process.env.API_PORT}`
        );
    });

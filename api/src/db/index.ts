import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { UserDates } from '../models/UserDates.model';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';

let DB_HOST = process.env.POSTGRES_HOST;
if (!DB_HOST) {
    DB_HOST = isDev ? 'localhost' : 'postgres';
}

const sequelizeOptions: SequelizeOptions = {
    host: DB_HOST,
    port: isDev ? Number.parseInt(process.env.POSTGRES_PORT!) : 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);

sequelize.addModels([UserDates]);

export const connectToDb = () => {
    try {
        sequelize.authenticate().then(async () => {
            console.log('Connection to db has been established successfully.');
            await sequelize.sync({ alter: true });
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

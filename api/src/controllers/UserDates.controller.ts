import { Request, Response } from 'express';
import { UserDates } from '../models/UserDates.model';
import { RowData } from '../../../src/types/types';
import { sequelize } from '../db';

export default class UserDatesController {
    public static async getAll(request: Request, response: Response) {
        try {
            const userDatesList = await UserDates.findAll();
            return response.json(userDatesList);
        } catch (err) {
            response.status(500).json(err);
        }
    }

    public static async setAll(request: Request, response: Response) {
        try {
            const rowDataList = request.body as RowData[];

            await UserDates.destroy({
                truncate: true,
            });

            await UserDates.bulkCreate(rowDataList);

            await UserDates.findAll();

            return response.json('OK');
        } catch (err) {
            response.status(500).json(err);
        }
    }

    public static async deleteAll(request: Request, response: Response) {
        try {
            await UserDates.destroy({
                truncate: true,
            });

            return response.json('true');
        } catch (err) {
            response.status(500).json(err);
        }
    }

    private static async getReturnedQuantity(days: number) {
        const result = await sequelize.query(
            `SELECT COUNT(id) FROM user_dates WHERE "lastActivityDate" >= "registrationDate" + interval '${days}' day`,
            {
                model: UserDates,
                mapToModel: true,
            }
        );
        return result[0].getDataValue('count');
    }

    private static async getInstalledQuantity(days: number) {
        const result = await sequelize.query(
            `SELECT COUNT(id) FROM user_dates WHERE "registrationDate" <= NOW() - interval '${days}' day`,
            {
                model: UserDates,
                mapToModel: true,
            }
        );
        return result[0].getDataValue('count');
    }

    public static async calculateRollingRetention(
        request: Request,
        response: Response
    ) {
        try {
            const { days } = request.params;

            const returnedQuantity = await UserDatesController.getReturnedQuantity(
                Number(days)
            );
            const installedQuantity = await UserDatesController.getInstalledQuantity(
                Number(days)
            );

            const rollingRetention =
                installedQuantity === 0
                    ? 0
                    : (returnedQuantity / installedQuantity) * 100;

            return response.json(rollingRetention);
        } catch (error) {
            response.status(500).json(error);
        }
    }
}

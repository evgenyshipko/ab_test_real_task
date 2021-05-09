import { Request, Response } from 'express';
import { UserDates } from '../models/UserDates.model';
import { RowData } from '../../../src/types/types';

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

    public static async deleteByUserId(request: Request, response: Response) {
        try {
            const { userId } = request.params;

            const userDate = await UserDates.findOne({
                where: {
                    userId,
                },
            });
            if (userDate) {
                await userDate.destroy();
            }

            return response.json('true');
        } catch (err) {
            response.status(500).json(err);
        }
    }
}

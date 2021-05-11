import { ChartDataType, RowData, RowResponseData } from '@src/types/types';
import moment from 'moment';
import { showWarnMessage } from '@src/utils';

const API_LINK = `${process.env.HOST}:${process.env.API_PORT}/api/userDates`;

export const saveUserDatesInDB = (rowList: RowData[]) => {
    return fetch(API_LINK, {
        method: 'POST',
        body: JSON.stringify(rowList),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
        .then((res) => res.json())
        .catch((error) => {
            showWarnMessage('Ошибка сервера');
            console.log(error);
        });
};

export const getUserDatesFromDb = (): Promise<RowData[] | void> => {
    return fetch(API_LINK)
        .then((res) => res.json() as Promise<RowResponseData[]>)
        .then((res) =>
            res.map((row) => ({
                ...row,
                registrationDate: moment(row.registrationDate),
                lastActivityDate: moment(row.lastActivityDate),
            }))
        )
        .catch((error) => {
            showWarnMessage('Невозможно получить данные пользователей из базы');
            console.log(error);
        });
};

export const deleteUserDatesFromDb = () => {
    return fetch(API_LINK, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
        .then((res) => res.json())
        .catch((error) => {
            showWarnMessage('Ошибка сервера');
            console.log(error);
        });
};

export const getRollingRetention = (numOfDays: number): Promise<number> => {
    return fetch(`${API_LINK}/rollingRetention/${numOfDays}`)
        .then((res) => res.json())
        .catch((error) => {
            showWarnMessage('Ошибка при расчете rolling retention');
            console.log(error);
        });
};

export const getChartData = (): Promise<ChartDataType> => {
    return fetch(`${API_LINK}/chartData`)
        .then((res) => res.json())
        .catch((error) => {
            showWarnMessage('Ошибка при расчете данных гистограммы');
            console.log(error);
        });
};

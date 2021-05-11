import { RowData, RowResponseData } from '@src/types/types';
import moment from 'moment';
import { message } from 'antd';

const API_LINK = `${process.env.HOST}:${process.env.API_PORT}/api/userDates`;

export const setUserDates = (rowList: RowData[]) => {
    return fetch(API_LINK, {
        method: 'POST',
        body: JSON.stringify(rowList),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
        .then((res) => res.json())
        .catch((error) => {
            message.warning('Произошла ошибка!');
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
            message.warning('Произошла ошибка!');
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
            message.warning('Произошла ошибка!');
            console.log(error);
        });
};

export const getRollingRetention = (numOfDays: number): Promise<number> => {
    return fetch(`${API_LINK}/rollingRetention/${numOfDays}`)
        .then((res) => res.json())
        .catch((error) => {
            message.warning('Произошла ошибка!');
            console.log(error);
        });
};

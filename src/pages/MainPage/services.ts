import { RowData, RowResponseData } from '@src/types/types';
import moment from 'moment';

const API_LINK = `${process.env.HOST}:${process.env.API_PORT}/api/userDates`;

export const setUserDates = (rowList: RowData[]) => {
    return fetch(API_LINK, {
        method: 'POST',
        body: JSON.stringify(rowList),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    }).then((res) => res.json());
};

export const getUserDatesFromDb = (): Promise<RowData[]> => {
    return fetch(API_LINK)
        .then((res) => res.json() as Promise<RowResponseData[]>)
        .then((res) =>
            res.map((row) => ({
                ...row,
                registrationDate: moment(row.registrationDate),
                lastActivityDate: moment(row.lastActivityDate),
            }))
        );
};

export const deleteUserDateFromDb = (userId: number) => {
    return fetch(`${API_LINK}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    }).then((res) => res.json());
};

import moment from 'moment';

export type RowServiceData = {
    key: string;
} & RowData;

export type RowData = {
    userId: number;
    registrationDate?: moment.Moment;
    lastActivityDate?: moment.Moment;
};

export type RowResponseData = {
    userId: number;
    registrationDate?: string;
    lastActivityDate?: string;
};

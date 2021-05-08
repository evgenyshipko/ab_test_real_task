import moment from 'moment';

export type RowData = {
    key: string;
    userId: number;
    registrationDate?: moment.Moment;
    lastActivityDate?: moment.Moment;
    setColumnValue: (
        tableData: RowData[],
        index: number,
        columnName: string,
        value: any
    ) => void;
    deleteRow: (index: number) => void;
};

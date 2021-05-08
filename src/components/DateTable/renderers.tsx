import { RowData } from '@src/types/types';
import { DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';
import trash from '@src/assets/icons/trash.svg';
import { TrashButton } from './units';

export const actionRenderer = (text: any, row: RowData, index: number) => (
    <TrashButton
        onClick={() => row.deleteRow(index)}
        icon={<img src={trash} />}
    />
);

export const getDateRenderer = (tableData: RowData[], columnName: string) => (
    date: moment.Moment | undefined,
    row: RowData,
    index: number
) => (
    <DatePicker
        format={'DD.MM.yyyy'}
        defaultValue={date}
        onChange={(date) => {
            row.setColumnValue(tableData, index, columnName, date);
        }}
        disabledDate={(currentDate: moment.Moment) => {
            if (columnName === 'lastActivityDate') {
                return !(
                    row.registrationDate && currentDate >= row.registrationDate
                );
            }
            return false;
        }}
    />
);

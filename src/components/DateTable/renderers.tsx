import { RowData, RowServiceData } from '@src/types/types';
import { DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';
import trash from '@src/assets/icons/trash.svg';
import { TrashButton } from './units';

import store from '../../store/Store';

export const actionRenderer = (text: any, row: RowData, index: number) => (
    <TrashButton
        onClick={() => store.deleteRow(index)}
        icon={<img src={trash} />}
    />
);

export const getDateRenderer = (columnName: string) => (
    date: moment.Moment | undefined,
    row: RowServiceData,
    index: number
) => (
    <DatePicker
        format={'DD.MM.yyyy'}
        defaultValue={date}
        onChange={(date) => {
            store.setColumnValue(index, columnName, date);
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

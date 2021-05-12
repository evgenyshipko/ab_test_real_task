import React from 'react';
import moment from 'moment';

import { DatePicker } from 'antd';

import store from '@src/store/Store';

import { RowServiceData } from '@src/types/types';

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

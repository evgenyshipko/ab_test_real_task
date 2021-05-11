import { RowServiceData } from '@src/types/types';
import { DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';

import store from '@src/store/Store';

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

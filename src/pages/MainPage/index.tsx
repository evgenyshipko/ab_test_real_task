import React, { FC, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import '@src/styles/App.css';
import 'antd/dist/antd.css';
import { RowData } from '@src/types/types';
import { DateTable } from '@components/DateTable';
import { RollingRetentionBlock } from '@components/RollingRetentionBlock';
import {
    ButtonBlock,
    Paper,
    TableBlock,
    Wrapper,
} from '@src/pages/MainPage/units';
import moment from 'moment';
import { StyledButton } from '@src/components/Button';

const MainPage: FC = () => {
    const initialData: RowData = {
        key: uuidv4(),
        userId: 1,
        lastActivityDate: moment(),
        registrationDate: moment(),
        setColumnValue: (
            tableData: RowData[],
            index: number,
            columnName: string,
            value: any
        ) => {},
        deleteRow: (index: number) => {},
    };

    const [data, setData] = useState<RowData[]>([initialData]);

    const setColumnValue = (
        tableData: RowData[],
        index: number,
        columnName: string,
        value: any
    ) => {
        const updatedData = tableData.map((row, innerIndex) => {
            if (index === innerIndex) {
                return { ...row, [columnName]: value };
            }
            return row;
        });

        setData(updatedData);
    };

    const deleteRow = (index: number) => {
        setData((data) =>
            data.filter((value, innerIndex) => innerIndex !== index)
        );
    };

    const addRow = () => {
        const userId = data[data.length - 1]?.userId;

        const newElement: RowData = {
            key: uuidv4(),
            userId: userId ? userId + 1 : 1,
            setColumnValue: setColumnValue,
            deleteRow: deleteRow,
        };

        setData((data) => [...data, newElement]);
    };

    return (
        <Wrapper>
            <Paper>
                <ButtonBlock>
                    <StyledButton
                        onClick={addRow}
                        disabled={data.length >= 5}
                        children={'Create'}
                    />
                    <StyledButton children={'Save'} />
                </ButtonBlock>

                <TableBlock>
                    <DateTable data={data} />
                </TableBlock>

                <RollingRetentionBlock data={data} numOfDays={7} />
            </Paper>
        </Wrapper>
    );
};

export default MainPage;

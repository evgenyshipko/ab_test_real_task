import React, { FC } from 'react';
import { columns } from '@components/DateTable/columns';
import { RowData } from '@src/types/types';
import { StyledTable } from '@components/DateTable/units';
import { v4 as uuidv4 } from 'uuid';

type DateTableProps = {
    data: RowData[];
};

export const DateTable: FC<DateTableProps> = ({ data }) => (
    <StyledTable
        columns={columns}
        dataSource={data.map((row) => ({ ...row, key: uuidv4() }))}
        pagination={false}
    />
);

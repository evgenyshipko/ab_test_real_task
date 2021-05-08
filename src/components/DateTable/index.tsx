import React, { FC } from 'react';
import { getColumns } from '@components/DateTable/columns';
import { RowData } from '@src/types/types';
import { StyledTable } from '@components/DateTable/units';

type DateTableProps = {
    data: RowData[];
};

export const DateTable: FC<DateTableProps> = ({ data }) => (
    <StyledTable
        columns={getColumns(data)}
        dataSource={data}
        pagination={false}
    />
);

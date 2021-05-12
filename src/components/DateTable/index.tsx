import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { columns } from '@components/DateTable/columns';
import { StyledTable } from '@components/DateTable/units';

import { RowData } from '@src/types/types';

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

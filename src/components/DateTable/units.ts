import styled from 'styled-components';
import { Button, Table } from 'antd';
import { TableProps } from 'antd/lib/table/Table';
import { FC } from 'react';
import { RowData } from '@src/types/types';

export const StyledTable = styled(Table)`
    th {
        background-color: rgba(93, 109, 151, 0.1) !important;
        color: #5d6d97 !important;
    }

    td,
    input {
        color: #5d6d97 !important;
    }
` as FC<TableProps<RowData>>;

export const TrashButton = styled(Button)`
    border: none;
`;

import {
    actionRenderer,
    getDateRenderer,
} from '@components/DateTable/renderers';
import { RowData } from '@src/types/types';

export const getColumns = (tableData: RowData[]) => [
    {
        title: 'UserId',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: 'Date Registration',
        dataIndex: 'registrationDate',
        key: 'registrationDate',
        render: getDateRenderer(tableData, 'registrationDate'),
    },
    {
        title: 'Date Last Activity',
        dataIndex: 'lastActivityDate',
        key: 'lastActivityDate',
        render: getDateRenderer(tableData, 'lastActivityDate'),
    },
    {
        dataIndex: 'action',
        key: 'action',
        render: actionRenderer,
    },
];

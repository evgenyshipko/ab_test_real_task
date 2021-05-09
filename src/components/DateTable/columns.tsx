import {
    actionRenderer,
    getDateRenderer,
} from '@components/DateTable/renderers';

export const columns = [
    {
        title: 'UserId',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: 'Date Registration',
        dataIndex: 'registrationDate',
        key: 'registrationDate',
        render: getDateRenderer('registrationDate'),
    },
    {
        title: 'Date Last Activity',
        dataIndex: 'lastActivityDate',
        key: 'lastActivityDate',
        render: getDateRenderer('lastActivityDate'),
    },
    {
        dataIndex: 'action',
        key: 'action',
        render: actionRenderer,
    },
];

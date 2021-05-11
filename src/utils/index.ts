import { message } from 'antd';

const params = {
    duration: 1,
    style: {
        marginTop: '30px',
    },
};

export const showSuccessMessage = (text: string) =>
    message.success({
        content: text,
        ...params,
    });

export const showInfoMessage = (text: string) =>
    message.info({
        content: text,
        ...params,
    });

export const showWarnMessage = (text: string) =>
    message.warn({
        content: text,
        ...params,
    });

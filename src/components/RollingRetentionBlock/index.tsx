import React, { FC } from 'react';
import { Chart } from 'react-google-charts';
import {
    RollingRetentionInfo,
    RollingRetentionWrapper,
} from '@components/RollingRetentionBlock/units';
import Store from '@src/store/Store';
import { observer } from 'mobx-react';

type Props = {
    numOfDays: number;
    store: typeof Store;
};

export const RollingRetentionBlock: FC<Props> = observer(
    ({ store, numOfDays }) => {
        const chart = (
            <Chart
                chartType="ColumnChart"
                width={'500px'}
                height={'300px'}
                data={[['Days', 'User quantity'], ...store.chartData]}
                options={{
                    title: 'User lifetime',
                    hAxis: {
                        title: 'Lifetime, days',
                    },
                    vAxis: {
                        title: 'User quantity',
                    },
                }}
            />
        );

        return (
            <RollingRetentionWrapper>
                {store.rollingRetention ? (
                    <RollingRetentionInfo>
                        Rolling Retention {numOfDays} days:{' '}
                        {store.rollingRetention} %
                    </RollingRetentionInfo>
                ) : (
                    <></>
                )}
                {store.chartData && store.chartData.length > 0 ? chart : <></>}
            </RollingRetentionWrapper>
        );
    }
);

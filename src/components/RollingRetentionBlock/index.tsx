import React, { FC } from 'react';
import { Chart } from 'react-google-charts';
import {
    RollingRetentionInfo,
    RollingRetentionWrapper,
} from '@components/RollingRetentionBlock/units';
import { StyledButton } from '@components/Button';
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
                data={[['UserId', 'Days'], ...store.chartData]}
                options={{
                    title: 'User lifetime',
                    hAxis: {
                        title: 'UserId',
                    },
                    vAxis: {
                        title: 'Lifetime, days',
                    },
                }}
            />
        );

        return (
            <RollingRetentionWrapper>
                <StyledButton
                    onClick={() => {
                        store.calculateRollingRetention(numOfDays);
                        store.calculateChartData();
                    }}
                >
                    Calculate
                </StyledButton>
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

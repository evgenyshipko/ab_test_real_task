import React, { FC, useState } from 'react';
import { RowData } from '@src/types/types';
import moment from 'moment';
import { Chart } from 'react-google-charts';
import { RollingRetentionWrapper } from '@components/RollingRetentionBlock/units';
import { StyledButton } from '@components/Button';

type Props = {
    numOfDays: number;
    data: RowData[];
};

type ChartDataType = (number | string)[][];

const getMomentDifferenceInDays = (
    date1: moment.Moment,
    date2: moment.Moment
) => {
    return Math.floor(
        Math.abs(date1.toDate().getTime() - date2.toDate().getTime()) /
            (1000 * 24 * 60 * 60)
    );
};

export const RollingRetentionBlock: FC<Props> = ({ data, numOfDays }) => {
    const [retention, setRetention] = useState<number>(0);

    const [chartData, setChartData] = useState<ChartDataType>([]);

    const calculateChartData = () => {
        const calculatedChartData = data.reduce((acc, row) => {
            if (row.registrationDate && row.lastActivityDate) {
                acc.push([
                    row.userId.toString(),
                    getMomentDifferenceInDays(
                        row.registrationDate,
                        row.lastActivityDate
                    ),
                ]);
            }
            return acc;
        }, [] as ChartDataType);
        setChartData(calculatedChartData);
    };

    const calculateRollingRetention = () => {
        let backUsers = 0;
        let installs = 0;

        data.forEach((row) => {
            if (row.lastActivityDate && row.registrationDate) {
                if (
                    getMomentDifferenceInDays(
                        row.lastActivityDate,
                        row.registrationDate
                    ) >= numOfDays
                ) {
                    backUsers++;
                }
                if (
                    getMomentDifferenceInDays(moment(), row.registrationDate) <=
                    numOfDays
                ) {
                    installs++;
                }
            }
        });

        console.log('backUsers', backUsers, 'installs', installs);

        setRetention(Math.round((backUsers / installs) * 100));
    };

    const chart = (
        <Chart
            chartType="ColumnChart"
            width={'500px'}
            height={'300px'}
            data={[['UserId', 'Days'], ...chartData]}
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
                    calculateRollingRetention();
                    calculateChartData();
                    console.log('chartData', chartData);
                }}
            >
                Calculate
            </StyledButton>
            {retention ? (
                <div>
                    Rolling Retention {numOfDays} days: {retention} %
                </div>
            ) : (
                <></>
            )}
            {chartData && chartData.length > 0 ? chart : <></>}
        </RollingRetentionWrapper>
    );
};

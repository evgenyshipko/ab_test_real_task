import { makeAutoObservable } from 'mobx';
import { RowData } from '@src/types/types';
import {
    deleteUserDatesFromDb,
    getRollingRetention,
    getUserDatesFromDb,
    setUserDates,
} from '@src/pages/MainPage/services';
import { message } from 'antd';
import moment from 'moment';

type ChartDataType = (number | string)[][];

const getMomentDifferenceInDays = (
    moment1: moment.Moment,
    moment2: moment.Moment
) => {
    return Math.floor(
        Math.abs(moment1.toDate().getTime() - moment2.toDate().getTime()) /
            (1000 * 24 * 60 * 60)
    );
};

class Store {
    data: RowData[] = [];

    rollingRetention?: number;

    chartData: ChartDataType = [];

    constructor() {
        makeAutoObservable(this);
    }

    clearTableData = () => {
        this.data = [];

        this.rollingRetention = undefined;

        this.chartData = [];

        deleteUserDatesFromDb();
    };

    setColumnValue = (index: number, columnName: string, value: any) => {
        this.data = this.data.map((row, innerIndex) => {
            if (index === innerIndex) {
                return { ...row, [columnName]: value };
            }
            return row;
        });
    };

    generateRowData = (): RowData => {
        const userId = this.data[this.data.length - 1]?.userId;
        return {
            userId: userId ? userId + 1 : 1,
        };
    };

    private isSavingValid = () =>
        this.data.every(
            (value) =>
                value.userId && value.registrationDate && value.lastActivityDate
        );

    saveUserDates = async () => {
        if (this.isSavingValid()) {
            await setUserDates(this.data);
            message.success({
                content: 'Данные сохранены успешно!',
                duration: 1,
                style: {
                    marginTop: '30px',
                },
            });
        } else {
            message.info({
                content: 'Для сохранения необходимо заполнить даты',
                duration: 1,
                style: {
                    marginTop: '30px',
                },
            });
        }
    };

    getInitialData = async () => {
        const result = await getUserDatesFromDb();
        if (result) {
            this.data = result;
        }
    };

    updateData = async () => {
        if (this.data.length < 5) {
            const newEmptyRows = [];
            for (let i = 0; i < 5 - this.data.length; i++) {
                newEmptyRows.push(this.generateRowData());
            }
            this.data = [...this.data, ...newEmptyRows];
        }
    };

    calculateChartData = () => {
        const chartDataMap = this.data.reduce((acc, row) => {
            if (row.registrationDate && row.lastActivityDate) {
                const days = getMomentDifferenceInDays(
                    row.registrationDate,
                    row.lastActivityDate
                );
                const currentValue = acc[days.toString()] as number;
                acc[days.toString()] = currentValue ? currentValue + 1 : 1;
            }
            return acc;
        }, {} as Record<string, number>);

        this.chartData = Object.keys(chartDataMap).reduce((acc, key) => {
            acc.push([key, chartDataMap[key]]);
            return acc;
        }, [] as ChartDataType);
    };

    calculateRollingRetention = async (numOfDays: number) => {
        this.rollingRetention = await getRollingRetention(numOfDays);
    };
}

const store = new Store();
export default store;

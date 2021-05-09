import { makeAutoObservable } from 'mobx';
import { RowData } from '@src/types/types';
import {
    deleteUserDateFromDb,
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

    setColumnValue = (index: number, columnName: string, value: any) => {
        this.data = this.data.map((row, innerIndex) => {
            if (index === innerIndex) {
                return { ...row, [columnName]: value };
            }
            return row;
        });
    };

    deleteRow = async (index: number) => {
        const userId = this.data[index]?.userId;
        this.data = this.data.filter(
            (value, innerIndex) => innerIndex !== index
        );
        if (userId) {
            await deleteUserDateFromDb(userId);
        }
    };

    addRow = () => {
        const userId = this.data[this.data.length - 1]?.userId;

        const newElement: RowData = {
            userId: userId ? userId + 1 : 1,
        };

        this.data = [...this.data, newElement];
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

    updateData = async () => {
        this.data = await getUserDatesFromDb();
    };

    calculateChartData = () => {
        this.chartData = this.data.reduce((acc, row) => {
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
    };

    calculateRollingRetention = (numOfDays: number) => {
        let backUsers = 0;
        let installs = 0;

        this.data.forEach((row) => {
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
        this.rollingRetention = Math.round((backUsers / installs) * 100);
    };
}

const store = new Store();
export default store;

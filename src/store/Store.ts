import { makeAutoObservable } from 'mobx';
import {
    deleteUserDatesFromDb,
    getChartData,
    getRollingRetention,
    getUserDatesFromDb,
    saveUserDatesInDB,
} from '@src/pages/MainPage/services';
import { showInfoMessage, showSuccessMessage } from '@src/utils';

import { ChartDataType, RowData } from '@src/types/types';

class Store {
    data: RowData[] = [];

    rollingRetention?: number;

    chartData: ChartDataType = [];

    constructor() {
        makeAutoObservable(this);
    }

    clearAllData = async () => {
        this.data = [];

        this.rollingRetention = undefined;

        this.chartData = [];

        await deleteUserDatesFromDb();

        showSuccessMessage('Данные удалены успешно!');
    };

    setColumnValue = (index: number, columnName: string, value: any) => {
        this.data = this.data.map((row, innerIndex) => {
            if (index === innerIndex) {
                return { ...row, [columnName]: value };
            }
            return row;
        });
    };

    private generateRowData = (userId: number): RowData => ({
        userId,
    });

    private isSavingValid = () =>
        this.data.every(
            (value) =>
                value.userId && value.registrationDate && value.lastActivityDate
        );

    saveTableData = async () => {
        if (this.isSavingValid()) {
            await saveUserDatesInDB(this.data);
            showSuccessMessage('Данные сохранены успешно!');
        } else {
            showInfoMessage('Для сохранения необходимо заполнить даты');
        }
    };

    getTableData = async () => {
        const result = await getUserDatesFromDb();
        if (result) {
            this.data = result;
        }
    };

    updateDataByEmptyRows = async () => {
        if (this.data.length < 5) {
            const newEmptyRows = [];

            let userId = this.data[this.data.length - 1]?.userId;
            if (!userId) {
                userId = 0;
            }

            for (let i = 0; i < 5 - this.data.length; i++) {
                userId++;
                newEmptyRows.push(this.generateRowData(userId));
            }
            this.data = [...this.data, ...newEmptyRows];
        }
    };

    updateChartData = async () => {
        this.chartData = await getChartData();
    };

    updateRollingRetention = async (numOfDays: number) => {
        const rollingRetention = await getRollingRetention(numOfDays);

        this.rollingRetention = Math.round(rollingRetention * 100) / 100;
    };
}

const store = new Store();
export default store;

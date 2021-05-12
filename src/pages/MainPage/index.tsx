import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';

import { Button } from '@components/Button';
import { DateTable } from '@components/DateTable';

import { RollingRetentionBlock } from '@components/RollingRetentionBlock';
import {
    ButtonBlock,
    Paper,
    TableBlock,
    Wrapper,
} from '@src/pages/MainPage/units';
import Store from '@src/store/Store';

type MainPageProps = {
    store: typeof Store;
};

const numOfDays = 7;

const MainPage: FC<MainPageProps> = observer(({ store }) => {
    useEffect(() => {
        store.getTableData();
    }, []);

    useEffect(() => {
        store.updateDataByEmptyRows();
    }, [store.data]);

    return (
        <Wrapper>
            <Paper>
                <ButtonBlock>
                    <Button
                        children={'Save'}
                        onClick={() => store.saveTableData()}
                    />
                    <Button
                        children={'Calculate'}
                        onClick={async () => {
                            await store.updateRollingRetention(numOfDays);
                            store.updateChartData();
                        }}
                    />
                    <Button
                        children={'Clear'}
                        onClick={() => store.clearAllData()}
                    />
                </ButtonBlock>

                <TableBlock>
                    <DateTable data={store.data} />
                </TableBlock>

                <RollingRetentionBlock store={store} numOfDays={numOfDays} />
            </Paper>
        </Wrapper>
    );
});

export default MainPage;

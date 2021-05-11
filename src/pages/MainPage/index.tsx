import React, { FC, useEffect } from 'react';

import 'antd/dist/antd.css';
import { DateTable } from '@components/DateTable';
import { RollingRetentionBlock } from '@components/RollingRetentionBlock';
import {
    ButtonBlock,
    Paper,
    TableBlock,
    Wrapper,
} from '@src/pages/MainPage/units';
import { StyledButton } from '@src/components/Button';
import Store from '@src/store/Store';
import { observer } from 'mobx-react';

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
                    <StyledButton
                        children={'Save'}
                        onClick={() => store.saveTableData()}
                    />
                    <StyledButton
                        children={'Calculate'}
                        onClick={async () => {
                            await store.updateRollingRetention(numOfDays);
                            store.updateChartData();
                        }}
                    />
                    <StyledButton
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

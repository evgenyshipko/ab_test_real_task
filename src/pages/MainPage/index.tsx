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
        store.getInitialData();
    }, []);

    useEffect(() => {
        store.updateData();
    }, [store.data]);

    return (
        <Wrapper>
            <Paper>
                <ButtonBlock>
                    <StyledButton
                        children={'Save'}
                        onClick={() => store.saveUserDates()}
                    />
                    <StyledButton
                        children={'Calculate'}
                        onClick={async () => {
                            await store.calculateRollingRetention(numOfDays);
                            store.calculateChartData();
                        }}
                    />
                    <StyledButton
                        children={'Clear'}
                        onClick={() => store.clearTableData()}
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

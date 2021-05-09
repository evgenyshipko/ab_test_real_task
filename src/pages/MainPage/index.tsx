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

const MainPage: FC<MainPageProps> = observer(({ store }) => {
    useEffect(() => {
        store.updateData();
    }, []);

    return (
        <Wrapper>
            <Paper>
                <ButtonBlock>
                    <StyledButton
                        onClick={() => store.addRow()}
                        disabled={store.data.length >= 5}
                        children={'Create'}
                    />
                    <StyledButton
                        children={'Save'}
                        onClick={() => store.saveUserDates()}
                    />
                </ButtonBlock>

                <TableBlock>
                    <DateTable data={store.data} />
                </TableBlock>

                <RollingRetentionBlock store={store} numOfDays={7} />
            </Paper>
        </Wrapper>
    );
});

export default MainPage;

import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from '@src/pages/MainPage';
import Store from './store/Store';

import 'antd/dist/antd.css';

ReactDOM.render(<MainPage store={Store} />, document.getElementById('root'));

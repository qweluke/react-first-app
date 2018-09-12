import React from 'react';
import { render } from 'react-dom'
import { Provider } from "react-redux";
import { IntlWrapper } from './i18n/IntlWrapper';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './assets/css/app.css';

import {store} from './store'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

render((
    <Provider store={store}>
        <IntlWrapper>
            <App />
        </IntlWrapper>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
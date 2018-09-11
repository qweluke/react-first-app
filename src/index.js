import React from 'react';
import { render } from 'react-dom'
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import { IntlWrapper } from './i18n/IntlWrapper';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {store} from './store'

import App from './App';
import registerServiceWorker from './registerServiceWorker';


let language = navigator.language.split(/[-_]/)[0];  // language without region code

if(localStorage.getItem('_locale')) {
    language = localStorage.getItem('_locale');
}

localStorage.setItem('_locale', language);

render((
    <Provider store={store}>
        <IntlWrapper locale={localStorage.getItem('_locale')}>
            <App />
        </IntlWrapper>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
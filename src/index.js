import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { IntlProvider, addLocaleData } from 'react-intl';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';

import messages_pl from "./translations/pl.json";
import messages_en from "./translations/en.json";
const messages = {
    'pl': messages_pl,
    'en': messages_en
};

addLocaleData([...en, ...pl]);
const locales = ['en','pl'];

let language = navigator.language.split(/[-_]/)[0];  // language without region code

if(locales.indexOf(language) < 0) {
    language = 'en';
}

render((
    <IntlProvider locale={language}  messages={messages[language]}>
        <App />
    </IntlProvider>
), document.getElementById('root'));
registerServiceWorker();
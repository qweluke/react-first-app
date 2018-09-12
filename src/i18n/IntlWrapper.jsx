import React, { Component } from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'

import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';

import messages_en from "./en.json";
import messages_pl from "./pl.json";
const messages = {
    'pl': messages_pl,
    'en': messages_en
};

addLocaleData([...en, ...pl]);
const { Provider, Consumer } = React.createContext();

{ // detect locale depending on browser language
    let language = localStorage.getItem('_locale') || navigator.language.split(/[-_]/)[0];

    if(typeof messages[language] === 'undefined') {
        language = 'en';
    }

    localStorage.setItem('_locale', language);
}

export class IntlWrapper extends Component {

    constructor(props) {
        super(props);

        this.switchLocale = (locale) => {
            this.setState({ locale: locale, messages: messages[locale] });
            localStorage.setItem('_locale', locale);
        }

        // pass everything in state to avoid creating object inside render method (like explained in the documentation)
        this.state = {
            locale: localStorage.getItem('_locale'),
            messages: messages[localStorage.getItem('_locale')],
            switchLocale: this.switchLocale
        };
    }

    render() {
        const { children } = this.props;
        const { locale, messages } = this.state;

        return (
            <Provider value={this.state}>
                <IntlProvider
                    key={locale}
                    locale={locale}
                    messages={messages}
                    defaultLocale="en"
                >
                    {children}
                </IntlProvider>
            </Provider>
        );
    }
}

export { IntlWrapper as IntlProvider, Consumer as IntlConsumer };
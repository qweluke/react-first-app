import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import { render } from 'react-dom'
import { Router } from 'react-router'

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

export class IntlWrapper extends Component {

    constructor(...args) {
        super(...args);

        this.switchLocale = (locale) =>
            this.setState({ locale: locale, messages: messages[locale] });

        // pass everything in state to avoid creating object inside render method (like explained in the documentation)
        this.state = {
            locale: "en",
            messages: messages_en,
            switchLocale: this.switchLocale
        };
    }

    switchLocale = (locale) =>
        this.setState({ locale: locale, messages: messages[locale] });

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
import React, {Component} from 'react';
import Types from "prop-types";
import {IntlProvider, addLocaleData} from "react-intl";
import en from "react-intl/locale-data/en";
import pl from "react-intl/locale-data/pl";
import enTranslation from "./en.json";
import plTranslation from "./pl.json";

addLocaleData([...en, ...pl]);

// const {Provider, Consumer} = React.createContext();
const LocaleContext = React.createContext();

class LocaleProvider extends Component {
    constructor(...args) {
        super(...args);

        this.switchToEnglish = () =>
            this.setState({locale: "en", messages: enTranslation});

        this.switchTPolish = () =>
            this.setState({locale: "pl", messages: plTranslation});

        // pass everything in state to avoid creating object inside render method (like explained in the documentation)
        this.state = {
            locale: "en",
            messages: enTranslation,
            switchToEnglish: this.switchToEnglish,
            switchToPolish: this.switchTPolish
        };
    }

    render() {
        const {children} = this.props;
        const {locale, messages} = this.state;
        return (
            <LocaleContext.Provider
                value={this.state}>
                <IntlProvider
                    key={locale}
                    locale={locale}
                    messages={messages}
                    defaultLocale="en"
                >
                    {children}
                </IntlProvider>
            </LocaleContext.Provider>
        );
    }
}

export default LocaleProvider;
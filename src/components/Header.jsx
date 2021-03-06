import React, {Component} from 'react';
import {Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl';
import { IntlConsumer } from "../i18n/IntlWrapper";
class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <div>
                <Nav>
                    <Link to="/" className="nav-link active"><FormattedMessage id="header.home"/></Link>
                    <Link to="/movie/199" className="nav-link"><FormattedMessage id="header.movie1"/></Link>
                    <Link to="/tv/4629" className="nav-link"><FormattedMessage id="header.movie2"/></Link>

                    <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle nav caret>
                            <FormattedMessage id="header.language"/>
                        </DropdownToggle>
                            <DropdownMenu>
                                <IntlConsumer>
                                    {({ switchLocale, autoDetectLocale }) => (
                                        <React.Fragment>
                                            <DropdownItem onClick={() => switchLocale('en')}><FormattedMessage id="header.language.list.en"/></DropdownItem>
                                            <DropdownItem onClick={() => switchLocale('pl')}><FormattedMessage id="header.language.list.pl"/></DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem onClick={autoDetectLocale}><FormattedMessage id="header.language.list.auto"/></DropdownItem>
                                        </React.Fragment>
                                    )}
                                </IntlConsumer>
                            </DropdownMenu>
                    </Dropdown>
                </Nav>
            </div>
        );
    }
}

export default Header;